using IdleRpgApi.Application.Exceptions;
using IdleRpgApi.Application.GameData;
using IdleRpgApi.Application.InventoryModule.Commands;
using IdleRpgApi.Application.InventoryModule.DTOs;
using IdleRpgApi.Application.Mapping;
using IdleRpgApi.Domain.Entities;
using IdleRpgApi.Domain.Enums;
using IdleRpgApi.Domain.Exceptions;
using IdleRpgApi.Domain.Services;
using IdleRpgApi.Infrastructure.Repositories.Interfaces;

namespace IdleRpgApi.Application.InventoryModule
{
    public class InventoryService : IInventoryService
    {
        private readonly IInventoryRepository _inventoryRepository;
        private readonly InventoryPlacementService _placementService;
        private readonly ItemDefinitionRepository _itemDefinitionRepository;
        private readonly ILogger<InventoryService> _logger;
        public InventoryService(IInventoryRepository inventoryRepository, 
            InventoryPlacementService placementService, 
            ItemDefinitionRepository itemDefinitionRepository,
            ILogger<InventoryService> logger
            ) 
        { 
            _inventoryRepository = inventoryRepository; 
            _placementService = placementService;   
            _itemDefinitionRepository = itemDefinitionRepository;
            _logger = logger;
        }

        public async Task<InventoryItemDto> AddRandomItemAsync(Guid userId)
        {
            var inventory = await _inventoryRepository.GetByUserIdAndTypeAsync(userId, InventoryType.Stash);

            if (inventory == null)
            {
                inventory = new Inventory(userId, InventoryType.Stash, 15, 10);
                await _inventoryRepository.SaveAsync(inventory);
            }

            var definitions = _itemDefinitionRepository.GetAll().ToList();

            var randomDef = definitions[Random.Shared.Next(definitions.Count)];

            var placedItems = inventory.Items
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
                })
                .ToList();

            var position = _placementService.FindFreeSpot(
                placedItems,
                randomDef
            );

            if (position == null)
            {
                _logger.LogWarning("Inventory is full for user {UserId}", userId);
                throw new InventoryFullException();
            }
             
            var item = inventory.AddItem(
                randomDef.Id,
                position.Value.x,
                position.Value.y
            );

            await _inventoryRepository.SaveAsync(inventory);

            _logger.LogInformation(
                "Item created for user {UserId}, item {ItemId}, def {DefinitionId}",
                userId, item.Id, item.DefinitionId
            );

            _logger.LogInformation("Inventory saved for user {UserId}", userId);

            return new InventoryItemDto
            {
                Id = item.Id,
                DefinitionId = item.DefinitionId,
                X = item.X,
                Y = item.Y,
                Quantity = item.Quantity,
                Rarity = item.Rarity
            };
        }

        public async Task<InventoryDto> GetStashInventoryAsync(Guid userId)
        {
            var inventory = await _inventoryRepository.GetByUserIdAndTypeAsync(userId, InventoryType.Stash);

            if (inventory == null)
            {
                inventory = new Inventory(userId, InventoryType.Stash, 15, 10);

                await _inventoryRepository.SaveAsync(inventory);
            }

            _logger.LogInformation("User {UserId} retrieved stash inventory", userId);

            return inventory.ToDto();
        }

        public async Task<InventoryDto> MergeItemsAsync(InventoryCommandDto command, Inventory inventory)
        {
            var definition = _itemDefinitionRepository.Get(command.DefinitionId);

            inventory.MergeItems(
                command.ItemId,
                command.Merge.TargetItemId,
                definition.MaxStack.Value
            );

            return inventory.ToDto();
        }

        public async Task<InventoryDto> MoveItemAsync(InventoryCommandDto command, Inventory inventory)
        {
            if (command.Move is null)
                throw new InvalidInventoryCommandException("MoveItem requires move payload");

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
                command.Move.ToX,
                command.Move.ToY))
            {
                throw new ItemPlacementException();
            }


            inventory.MoveItem(
                command.ItemId,
                command.Move.ToX,
                command.Move.ToY
            );

            return inventory.ToDto();
        }

        public async Task SaveAsync(Guid userId, InventoryDto dto)
        {
            var inventory = await _inventoryRepository
                .GetByUserIdAndTypeAsync(userId, InventoryType.Stash);

            if (inventory == null)
                inventory = new Inventory(userId, InventoryType.Stash, 15, 10);

            var dtoItemIds = dto.Items
                .Where(i => i.Id != Guid.Empty)
                .Select(i => i.Id)
                .ToHashSet();

            var itemsToRemove = inventory.Items
                .Where(i => !dtoItemIds.Contains(i.Id))
                .ToList();

            foreach (var item in itemsToRemove)
            {
                inventory.RemoveItem(item.Id);
            }

            foreach (var itemDto in dto.Items)
            {
                var existingItem = inventory.Items
                    .FirstOrDefault(i => i.Id == itemDto.Id);

                if (existingItem != null)
                {
                    existingItem.Update(
                        itemDto.X,
                        itemDto.Y,
                        itemDto.Quantity.Value,
                        itemDto.Rarity
                    );
                }
                else
                {
                    inventory.AddItem(
                        itemDto.DefinitionId,
                        itemDto.X,
                        itemDto.Y,
                        itemDto.Quantity,
                        itemDto.Rarity
                    );
                }
            }

            await _inventoryRepository.SaveAsync(inventory);

            _logger.LogInformation("Inventory synced for user {UserId}", userId);
        }

        public async Task<InventoryDto> SplitItemAsync(InventoryCommandDto command, Inventory inventory)
        {
            var item = inventory.GetItem(command.ItemId);

            var result = item.Split(command.Split.Quantity);

            var definition = _itemDefinitionRepository.Get(item.DefinitionId);

            var position = _placementService.FindFreeSpot(
                inventory.Items.Select(i =>
                {
                    var def = _itemDefinitionRepository.Get(i.DefinitionId);

                    return new PlacedItem
                    {
                        X = i.X,
                        Y = i.Y,
                        Width = def.Width,
                        Height = def.Height
                    };
                }).ToList(),
                definition
            );

            if (position == null)
                throw new InventoryFullException();

            inventory.AddItem(
                result.DefinitionId,
                position.Value.x,
                position.Value.y,
                result.Quantity,
                result.Rarity
            );

            return inventory.ToDto();
        }
    }
}
