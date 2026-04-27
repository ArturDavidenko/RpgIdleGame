using IdleRpgApi.Domain.Entities;
using IdleRpgApi.Domain.Enums;

namespace IdleRpgApi.Infrastructure.Repositories.Interfaces
{
    public interface IInventoryRepository
    {
        Task<Inventory?> GetByUserIdAndTypeAsync(Guid userId, InventoryType type);
        Task SaveAsync(Inventory inventory);
    }
}
