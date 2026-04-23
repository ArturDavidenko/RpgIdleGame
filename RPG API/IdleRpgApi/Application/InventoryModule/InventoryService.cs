using IdleRpgApi.Application.InventoryModule.DTOs;
using IdleRpgApi.Domain.Entities;
using IdleRpgApi.Infrastructure.Repositories.Interfaces;

namespace IdleRpgApi.Application.InventoryModule
{
    public class InventoryService : IInventoryService
    {
        private readonly IInventoryRepository _inventoryRepository;
        public InventoryService(IInventoryRepository inventoryRepository) 
        { 
            _inventoryRepository = inventoryRepository; 
        }

        public async Task<InventoryDto> GetByUserIdAsync(Guid userId)
        {
            var inventory = await _inventoryRepository.GetByUserIdAsync(userId);

            if (inventory == null)
            {
                inventory = new Inventory(userId);

                await _inventoryRepository.SaveAsync(inventory);
            }

            return MapToDto(inventory);
        }

        public async Task SaveAsync(Guid userId, InventoryDto dto)
        {
            var inventory = await _inventoryRepository.GetByUserIdAsync(userId);

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
                Items = inventory.Items.Select(i => new InventoryItemDto
                {
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
