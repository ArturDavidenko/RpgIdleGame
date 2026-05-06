using IdleRpgApi.Domain.Enums;
using IdleRpgApi.Middleware.ExceptionHandling;

namespace IdleRpgApi.Domain.Entities
{
    public class Inventory
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public User User { get; private set; } = null!;

        public InventoryType Type { get; private set; }

        public DateTime CreatedAt { get; private set; }

        private readonly List<InventoryItem> _items = new();
        public IReadOnlyCollection<InventoryItem> Items => _items;

        private Inventory() { }

        public Inventory(Guid userId, InventoryType type)
        {
            UserId = userId;
            CreatedAt = DateTime.UtcNow;
            Type = type;
        }

        public void ClearItems()
        {
            _items.Clear();
        }

        public InventoryItem AddItem(string definitionId, int x, int y, int? quantity = null, string? rarity = null)
        {
            if (_items.Any(i => i.X == x && i.Y == y))
                throw new DomainException("Slot already occupied");

            var item = new InventoryItem(Id, definitionId, x, y, quantity, rarity);

            _items.Add(item);

            return item;
        }

        public void MoveItem(Guid itemId, int toX, int toY)
        {
            var item = _items.FirstOrDefault(i => i.Id == itemId);

            if (item == null)
                throw new DomainException("Item not found");

            if (_items.Any(i => i.X == toX && i.Y == toY))
                throw new DomainException("Target slot occupied");

            item.MoveTo(toX, toY);
        }

        public void RemoveItem(Guid itemId)
        {
            var item = _items.FirstOrDefault(i => i.Id == itemId);

            if (item == null)
                throw new DomainException("Item not found");

            _items.Remove(item);
        }
    }
}
