namespace IdleRpgApi.Application.InventoryModule.DTOs
{
    public class InventoryDto
    {
        public Guid Id { get; set; }
        public string Type { get; set; } = null!;
        public List<InventoryItemDto> Items { get; set; } = new();
    }
}
