using IdleRpgApi.Application.Exceptions;
using IdleRpgApi.Application.GameData;
using IdleRpgApi.Application.InventoryModule.Commands;
using IdleRpgApi.Application.InventoryModule.DTOs;
using IdleRpgApi.Domain.Entities;
using IdleRpgApi.Domain.Enums;
using IdleRpgApi.Domain.Services;
using IdleRpgApi.Infrastructure.Repositories.Interfaces;

namespace IdleRpgApi.Application.InventoryModule
{
    public class InventoryCommandService : IInventoryCommandService
    {

        private readonly IInventoryRepository _inventoryRepository;
        private readonly ILogger<InventoryCommandService> _logger;
        private readonly ItemDefinitionRepository _itemDefinitionRepository; 
        private readonly InventoryPlacementService _placementService; 

        public InventoryCommandService(IInventoryRepository inventoryRepository, 
            ILogger<InventoryCommandService> logger, 
            ItemDefinitionRepository itemDefinitionRepository,
            InventoryPlacementService placementService)
        {
            _inventoryRepository = inventoryRepository;
            _logger = logger;
            _itemDefinitionRepository = itemDefinitionRepository;
            _placementService = placementService;
        }   

        public async Task<InventoryDto> ExecuteAsync(InventoryCommandDto command, Guid userId)
        {
            var inventory = await _inventoryRepository
                .GetByUserIdAndTypeAsync(userId, InventoryType.Stash);

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
                        if (!command.ToX.HasValue || !command.ToY.HasValue)
                            throw new InvalidInventoryCommandException("MoveItem requires ToX and ToY");

                        var itemDefinition = _itemDefinitionRepository.Get(command.DefinitionId);

                        var placedItems = inventory.Items
                        .Where(i => i.Id != command.ItemId)
                        .Select(i =>
                        {
                            var def = _itemDefinitionRepository.Get(i.DefinitionId);

                            return new PlacedItem
                            {
                                X = i.X,
                                Y = i.Y,
                                Width = def.Width,
                                Height = def.Height
                            };
                        });


                        if (!_placementService.CanPlace(
                            placedItems,
                            itemDefinition,
                            command.ToX.Value,
                            command.ToY.Value))
                        {
                            throw new ItemPlacementException();
                        }


                        inventory.MoveItem(
                            command.ItemId,
                            command.ToX.Value,
                            command.ToY.Value
                        );

                        break;
                    }

                case InventoryCommandType.DropItem:
                    {
                        //later
                        break;
                    }


                case InventoryCommandType.SplitItem:
                    {
                        //later
                        break;
                    }


                case InventoryCommandType.MergeItem:
                    {
                        //later
                        break;
                    }

                default:
                    throw new InvalidInventoryCommandException($"Command {command.CommandType} is not supported");
            }

            await _inventoryRepository.SaveAsync(inventory);

            _logger.LogInformation(
                "Inventory command {CommandType} executed for user {UserId}",
                command.CommandType,
                userId);

            return MapToDto(inventory);
        }

        private InventoryDto MapToDto(Inventory inventory)
        {
            return new InventoryDto
            {
                Id = inventory.Id,
                Type = inventory.Type.ToString(),
                Items = inventory.Items.Select(i => new InventoryItemDto
                {
                    Id = i.Id,
                    DefinitionId = i.DefinitionId,
                    X = i.X,
                    Y = i.Y,
                    Quantity = i.Quantity,
                    Rarity = i.Rarity
                }).ToList()
            };
        }
    }
}
