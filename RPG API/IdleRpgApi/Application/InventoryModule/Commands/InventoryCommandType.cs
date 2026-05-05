using System.Text.Json.Serialization;

namespace IdleRpgApi.Application.InventoryModule.Commands
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum InventoryCommandType
    {
        MoveItem,
        SplitItem,
        DropItem,
        MergeItem
    }
}
