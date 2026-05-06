using System.Text.Json;

namespace IdleRpgApi.Application.InventoryModule.Commands
{
    public class InventoryCommandDto
    {
        public Guid InventoryId { get; set; }

        public InventoryCommandType CommandType { get; set; }

        public string DefinitionId { get; set; } = null!;

        public Guid ItemId { get; set; }

        public int? ToX { get; set; }
        public int? ToY { get; set; }
    }
}
