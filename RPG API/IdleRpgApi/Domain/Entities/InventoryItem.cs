namespace IdleRpgApi.Domain.Entities
{
    public class InventoryItem
    {
        public Guid Id { get; private set; }

        public Guid InventoryId { get; private set; }
        public Inventory Inventory { get; private set; } = null!;

        public string DefinitionId { get; private set; } = null!;

        public int X { get; private set; }
        public int Y { get; private set; }

        public int? Quantity { get; private set; }
        public string? Rarity { get; private set; }

        private InventoryItem() { }

        public InventoryItem(Guid inventoryId, string definitionId, int x, int y)
        {
            InventoryId = inventoryId;
            DefinitionId = definitionId;
            X = x;
            Y = y;
        }
    }
}
