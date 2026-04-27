using IdleRpgApi.Domain.Entities;
using IdleRpgApi.Domain.Enums;
using IdleRpgApi.Infrastructure.Persistence;
using IdleRpgApi.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IdleRpgApi.Infrastructure.Repositories
{
    public class InventoryRepository : IInventoryRepository
    {
        private readonly AppDbContext _context;

        public InventoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Inventory?> GetByUserIdAndTypeAsync(Guid userId, InventoryType type)
        {
            return await _context.Inventories
                .Include(i => i.Items)
                .FirstOrDefaultAsync(i => i.UserId == userId && i.Type == type);
        }

        public async Task SaveAsync(Inventory inventory)
        {
            _context.Update(inventory);
            await _context.SaveChangesAsync();
        }
    }
}
