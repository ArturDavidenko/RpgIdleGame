using IdleRpgApi.Middleware.ExceptionHandling;

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

        public int Quantity { get; private set; }
        public string Rarity { get; private set; } = null!;

        private InventoryItem() { }

        public InventoryItem(Guid inventoryId, string definitionId, int x, int y, int? quantity = null,
        string? rarity = null)
        {
            InventoryId = inventoryId;
            DefinitionId = definitionId;
            X = x;
            Y = y;

            Quantity = 1;
            Rarity = "Common";

            Quantity = quantity ?? 1;
            Rarity = rarity ?? "Common";

            Validate();
        }

        private void Validate()
        {
            if (Quantity <= 0)
                throw new DomainException("Quantity must be >= 1");

            if (string.IsNullOrWhiteSpace(Rarity))
                throw new DomainException("Rarity is required");
        }

        public void MoveTo(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
}
