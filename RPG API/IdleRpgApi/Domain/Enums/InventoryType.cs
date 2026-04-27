using System.Text.Json.Serialization;

namespace IdleRpgApi.Domain.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum InventoryType
    {
        Stash,
        Companion,
        LootChest
    }
}
