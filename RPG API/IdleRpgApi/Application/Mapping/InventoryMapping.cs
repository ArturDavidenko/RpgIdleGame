using IdleRpgApi.Application.InventoryModule.DTOs;
using IdleRpgApi.Domain.Entities;

namespace IdleRpgApi.Application.Mapping
{
    public static class InventoryMapping
    {
        public static InventoryDto ToDto(this Inventory inventory)
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
