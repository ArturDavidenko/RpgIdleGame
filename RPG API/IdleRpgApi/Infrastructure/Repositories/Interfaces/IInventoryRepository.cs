using IdleRpgApi.Domain.Entities;

namespace IdleRpgApi.Infrastructure.Repositories.Interfaces
{
    public interface IInventoryRepository
    {
        Task<Inventory?> GetByUserIdAsync(Guid userId);
        Task SaveAsync(Inventory inventory);
    }
}
