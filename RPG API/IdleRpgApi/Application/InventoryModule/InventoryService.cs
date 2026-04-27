using IdleRpgApi.Application.GameData;
using IdleRpgApi.Application.InventoryModule.DTOs;
using IdleRpgApi.Domain.Entities;
using IdleRpgApi.Domain.Enums;
using IdleRpgApi.Domain.Services;
using IdleRpgApi.Infrastructure.Repositories.Interfaces;

namespace IdleRpgApi.Application.InventoryModule
{
    public class InventoryService : IInventoryService
    {
        private readonly IInventoryRepository _inventoryRepository;
        private readonly InventoryPlacementService _placementService;
        private readonly ItemDefinitionRepository _itemDefinitionRepository;
        public InventoryService(IInventoryRepository inventoryRepository, InventoryPlacementService placementService, ItemDefinitionRepository itemDefinitionRepository) 
        { 
            _inventoryRepository = inventoryRepository; 
            _placementService = placementService;   
            _itemDefinitionRepository = itemDefinitionRepository;
        }

        public async Task<InventoryItemDto> AddRandomItemAsync(Guid userId)
        {
            var inventory = await _inventoryRepository.GetByUserIdAndTypeAsync(userId, InventoryType.Stash);

            if (inventory == null)
            {
                inventory = new Inventory(userId);
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
                throw new Exception("Inventory is full");

            var item = inventory.AddItem(
                randomDef.Id,
                position.Value.x,
                position.Value.y
            );

            await _inventoryRepository.SaveAsync(inventory);

            return new InventoryItemDto
            {
                Id = item.Id,
                DefinitionId = item.DefinitionId,
                X = item.X,
                Y = item.Y
            };
        }

        public async Task<InventoryDto> GetByUserIdAndTypeAsync(Guid userId)
        {
            var inventory = await _inventoryRepository.GetByUserIdAndTypeAsync(userId, InventoryType.Stash);

            if (inventory == null)
            {
                inventory = new Inventory(userId);

                await _inventoryRepository.SaveAsync(inventory);
            }

            return MapToDto(inventory);
        }

        public async Task SaveAsync(Guid userId, InventoryDto dto)
        {
            var inventory = await _inventoryRepository.GetByUserIdAndTypeAsync(userId, InventoryType.Stash);

            if (inventory == null)
                inventory = new Inventory(userId);

            inventory.ClearItems();

            foreach (var itemDto in dto.Items)
            {
                inventory.AddItem(
                    itemDto.DefinitionId,
                    itemDto.X,
                    itemDto.Y,
                    itemDto.Quantity,
                    itemDto.Rarity
                );
            }

            await _inventoryRepository.SaveAsync(inventory);
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
