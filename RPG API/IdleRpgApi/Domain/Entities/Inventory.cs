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
    }
}
