using System.Text.Json;

namespace IdleRpgApi.Application.InventoryModule.Commands
{
    public class InventoryCommandDto
    {
        public Guid InventoryId { get; set; }

        public InventoryCommandType CommandType { get; set; }

        public string DefinitionId { get; set; } = null!;

        public Guid ItemId { get; set; }

        public MoveItemDto? Move { get; init; }
        public SplitItemDto? Split { get; init; }
        public MergeItemDto? Merge { get; init; }
    }

    public sealed class MoveItemDto
    {
        public int ToX { get; init; }
        public int ToY { get; init; }
    }

    public sealed class SplitItemDto
    {
        public int Quantity { get; init; }
    }
    public sealed class MergeItemDto
    {
        public Guid TargetItemId { get; init; }
    }

}
