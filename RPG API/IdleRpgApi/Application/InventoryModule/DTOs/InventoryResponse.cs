namespace IdleRpgApi.Application.InventoryModule.DTOs
{
    public class InventoryResponse
    {
        public string Id { get; set; } = null!;
        public List<InventoryItemDto> Items { get; set; } = new();
    }
}
