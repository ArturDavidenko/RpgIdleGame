using IdleRpgApi.Application.InventoryModule.Commands;
using IdleRpgApi.Application.InventoryModule.DTOs;
using IdleRpgApi.Domain.Entities;

namespace IdleRpgApi.Application.InventoryModule;

public interface IInventoryService
{
    Task<InventoryDto> GetStashInventoryAsync(Guid userId);

    Task<InventoryItemDto> AddRandomItemAsync(Guid userId);

    Task<Guid> SplitItemAsync(InventoryCommandDto command, Inventory inventory);

    Task MergeItemsAsync(InventoryCommandDto command, Inventory inventory);

    Task MoveItemAsync(InventoryCommandDto command, Inventory inventory);
}
