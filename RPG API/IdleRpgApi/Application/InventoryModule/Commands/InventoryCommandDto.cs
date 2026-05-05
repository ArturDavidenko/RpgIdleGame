using System.Text.Json;

namespace IdleRpgApi.Application.InventoryModule.Commands
{
    public class InventoryCommandDto
    {
        public Guid InventoryId { get; set; }

        public InventoryCommandType CommandType { get; set; }

        public JsonElement Payload { get; set; }
    }
}
