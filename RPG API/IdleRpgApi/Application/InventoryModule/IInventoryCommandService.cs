using IdleRpgApi.Application.InventoryModule.Commands;
using IdleRpgApi.Application.InventoryModule.DTOs;

namespace IdleRpgApi.Application.InventoryModule
{
    public interface IInventoryCommandService
    {
        public Task<InventoryDto> ExecuteAsync(InventoryCommandDto command, Guid userId);
    }
}
