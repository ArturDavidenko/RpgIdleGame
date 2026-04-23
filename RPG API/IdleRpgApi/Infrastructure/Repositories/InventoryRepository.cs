using IdleRpgApi.Domain.Entities;
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

        public async Task<Inventory?> GetByUserIdAsync(Guid userId)
        {
            return await _context.Inventories
            .Include(i => i.Items)
            .FirstOrDefaultAsync(i => i.UserId == userId);
        }

        public async Task SaveAsync(Inventory inventory)
        {
            _context.Update(inventory);
            await _context.SaveChangesAsync();
        }
    }
}
