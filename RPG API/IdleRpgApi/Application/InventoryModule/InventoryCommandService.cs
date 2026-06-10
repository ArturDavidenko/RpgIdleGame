using IdleRpgApi.Application.Exceptions;
using IdleRpgApi.Application.GameData;
using IdleRpgApi.Application.InventoryModule.Commands;
using IdleRpgApi.Application.InventoryModule.DTOs;
using IdleRpgApi.Domain.Enums;
using IdleRpgApi.Domain.Services;
using IdleRpgApi.Infrastructure.Repositories.Interfaces;

namespace IdleRpgApi.Application.InventoryModule
{
    public class InventoryCommandService : IInventoryCommandService
    {

        private readonly IInventoryRepository _inventoryRepository;
        private readonly ILogger<InventoryCommandService> _logger;
        private readonly IInventoryService _inventoryService;

        public InventoryCommandService(IInventoryRepository inventoryRepository, 
            ILogger<InventoryCommandService> logger, 
            ItemDefinitionRepository itemDefinitionRepository,
            InventoryPlacementService placementService,
            IInventoryService inventoryService)
        {
            _inventoryRepository = inventoryRepository;
            _logger = logger;
            _inventoryService = inventoryService;
        }   

        public async Task<InventoryActionResponseDto> ExecuteAsync(InventoryCommandDto command, Guid userId)
        {
            var inventory = await _inventoryRepository
                .GetByUserIdAndTypeAsync(userId, InventoryType.Stash);

            Guid? newItemId = null;

            if (inventory == null)
            {
                _logger.LogError(
                    "Inventory not found for user {UserId} and type {InventoryType}",
                    userId,
                    InventoryType.Stash);

                throw new InventoryNotFoundException(userId, InventoryType.Stash);
            }

            switch (command.CommandType)
            {
                case InventoryCommandType.MoveItem:
                    {
                        await _inventoryService.MoveItemAsync(command, inventory);
                        _logger.LogInformation("Item {ItemId} moved in inventory for user {UserId}",
                            command.ItemId,
                            userId);
                        break;
                    }

                case InventoryCommandType.DropItem:
                    {
                        inventory.RemoveItem(command.ItemId);
                        _logger.LogInformation(
                            "Item {ItemId} dropped from inventory for user {UserId}",
                            command.ItemId,
                            userId);
                        break;
                    }


                case InventoryCommandType.SplitItem:
                    {
                        newItemId = await _inventoryService.SplitItemAsync(command, inventory);
                        _logger.LogInformation(
                            "Item {ItemId} split in inventory for user {UserId}",
                            command.ItemId,
                            userId);
                        break;
                    }


                case InventoryCommandType.MergeItem:
                    {
                        await _inventoryService.MergeItemsAsync(command, inventory);
                        _logger.LogInformation(
                            "Items merged in inventory for user {UserId}",
                            userId);
                        break;
                    }

                default:
                    throw new InvalidInventoryCommandException($"Command {command.CommandType} is not supported");
            }

            await _inventoryRepository.SaveChangesAsync();

            _logger.LogInformation(
                "Inventory command {CommandType} executed for user {UserId}",
                command.CommandType,
                userId);

            return new InventoryActionResponseDto
            {
                Success = true,
                NewItemId = newItemId
            };
        }
    }
}
