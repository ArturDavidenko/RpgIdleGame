namespace IdleRpgApi.Application.InventoryModule.DTOs
{
    public class InventoryItemDto
    {
        public Guid Id { get; set; }
        public string DefinitionId { get; set; } = null!;
        public int X { get; set; }
        public int Y { get; set; }

        public int? Quantity { get; set; }
        public string? Rarity { get; set; }
    }
}
