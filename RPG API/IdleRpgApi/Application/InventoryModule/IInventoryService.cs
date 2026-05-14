using IdleRpgApi.Application.InventoryModule.Commands;
using IdleRpgApi.Application.InventoryModule.DTOs;

namespace IdleRpgApi.Application.InventoryModule;

public interface IInventoryService
{
    Task<InventoryDto> GetStashInventoryAsync(Guid userId);

    Task SaveAsync(Guid userId, InventoryDto dto);

    Task<InventoryItemDto> AddRandomItemAsync(Guid userId);

    Task<InventoryDto> SplitItemAsync(InventoryCommandDto command);

    Task<InventoryDto> MergeItemsAsync(InventoryCommandDto command);
}
