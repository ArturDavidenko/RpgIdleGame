using IdleRpgApi.Domain.Entities;

namespace IdleRpgApi.Application.InventoryModule.DTOs
{
    public class ItemSplitResult
    {
        public Guid InventoryId { get; init; }
        public string DefinitionId { get; init; }
        public int Quantity { get; init; }
        public string Rarity { get; init; }
    }
}
