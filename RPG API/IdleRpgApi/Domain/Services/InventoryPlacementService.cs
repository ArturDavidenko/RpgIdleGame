using IdleRpgApi.Application.GameData;
using IdleRpgApi.Domain.Entities;

namespace IdleRpgApi.Domain.Services
{
    public class InventoryPlacementService
    {
        private readonly int _columns;
        private readonly int _rows;

        public InventoryPlacementService(int columns = 15, int rows = 10)
        {
            _columns = columns;
            _rows = rows;
        }

        public (int x, int y)? FindFreeSpot(
            IEnumerable<PlacedItem> items,
            ItemDefinition definition)
        {
            for (int y = 0; y < _rows; y++)
            {
                for (int x = 0; x < _columns; x++)
                {
                    if (CanPlace(items, definition, x, y))
                        return (x, y);
                }
            }

            return null;
        }

        private bool CanPlace(
            IEnumerable<PlacedItem> items,
            ItemDefinition def,
            int startX,
            int startY)
        {
            if (startX + def.Width > _columns) return false;
            if (startY + def.Height > _rows) return false;

            foreach (var item in items)
            {
                if (Intersects(
                    startX, startY, def.Width, def.Height,
                    item.X, item.Y, item.Width, item.Height))
                {
                    return false;
                }
            }

            return true;
        }

        private bool Intersects(
            int x1, int y1, int w1, int h1,
            int x2, int y2, int w2, int h2)
        {
            return !(x1 + w1 <= x2 ||
                     x2 + w2 <= x1 ||
                     y1 + h1 <= y2 ||
                     y2 + h2 <= y1);
        }
    }
}
