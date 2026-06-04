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

        public int Width { get; private set; }

        public int Height { get; private set; }

        public DateTime CreatedAt { get; private set; }

        private readonly List<InventoryItem> _items = new();
        public IReadOnlyCollection<InventoryItem> Items => _items;

        private Inventory() { }

        public Inventory(Guid userId, InventoryType type, int width, int height)
        {
            if (width <= 0)
                throw new DomainException("Width must be greater than zero");

            if (height <= 0)
                throw new DomainException("Height must be greater than zero");

            UserId = userId;
            CreatedAt = DateTime.UtcNow;
            Type = type;
            Width = width;
            Height = height;
        }

        public void ClearItems()
        {
            _items.Clear();
        }

        public InventoryItem GetItem(Guid itemId)
        {
            return _items.Single(i => i.Id == itemId);
        }

        public InventoryItem AddItem(string definitionId, int x, int y, int? quantity = 1, string? rarity = "Common")
        {
            if (_items.Any(i => i.X == x && i.Y == y))
                throw new DomainException("Slot already occupied");

            var item = new InventoryItem(Guid.NewGuid(), Id, definitionId, x, y, quantity, rarity);

            _items.Add(item);

            return item;
        }

        public void MoveItem(Guid itemId, int toX, int toY)
        {
            var item = _items.SingleOrDefault(i => i.Id == itemId);

            if (item == null)
                throw new DomainException("Item not found");

            if (_items.Any(i => i.X == toX && i.Y == toY))
                throw new DomainException("Target slot occupied");

            item.MoveTo(toX, toY);
        }

        public void MergeItems(Guid sourceItemId, Guid targetItemId, int maxStackSize)
        {
            if (sourceItemId == targetItemId)
                throw new DomainException("Cannot merge item into itself.");

            var source = GetItem(sourceItemId);
            var target = GetItem(targetItemId);

            if (source.DefinitionId != target.DefinitionId)
                throw new DomainException("Items must have the same definition.");

            if (source.Rarity != target.Rarity)
                throw new DomainException("Items must have the same rarity.");

            if (target.Quantity >= maxStackSize)
                throw new DomainException("Target stack is already full.");

            var availableSpace = maxStackSize - target.Quantity;

            var quantityToTransfer = Math.Min(source.Quantity, availableSpace);

            target.AddQuantity(quantityToTransfer);
            source.RemoveQuantity(quantityToTransfer);

            if (source.Quantity == 0)
                RemoveItem(source.Id);
        }

        public void RemoveItem(Guid itemId)
        {
            var item = _items.SingleOrDefault(i => i.Id == itemId);

            if (item == null)
                throw new DomainException("Item not found");

            _items.Remove(item);
        }
    }
}
