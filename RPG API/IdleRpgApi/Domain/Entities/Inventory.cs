namespace IdleRpgApi.Domain.Entities
{
    public class Inventory
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public User User { get; private set; } = null!;

        public DateTime CreatedAt { get; private set; }

        private readonly List<InventoryItem> _items = new();
        public IReadOnlyCollection<InventoryItem> Items => _items;

        private Inventory() { }

        public Inventory(Guid userId)
        {
            UserId = userId;
            CreatedAt = DateTime.UtcNow;
        }

        public void ClearItems()
        {
            _items.Clear();
        }

        public void AddItem(string definitionId, int x, int y, int? quantity = null, string? rarity = null)
        {
            if (_items.Any(i => i.X == x && i.Y == y))
                throw new Exception("Slot already occupied");

            var item = new InventoryItem(Id, definitionId, x, y);

            _items.Add(item);
        }
    }
}
