using IdleRpgApi.Domain.Entities;
using IdleRpgApi.Domain.Enums;

namespace IdleRpgApi.Infrastructure.Repositories.Interfaces
{
    public interface IInventoryRepository
    {
        Task<Inventory?> GetByUserIdAndTypeAsync(Guid userId, InventoryType type);

        Task<Inventory> GetByIdAsync(Guid inventoryId);
        Task SaveChangesAsync();

        Task AddInventoryAsync(Inventory inventory);
    }
}
