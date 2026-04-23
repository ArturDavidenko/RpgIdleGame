namespace IdleRpgApi.Application.GameData
{
    public class ItemDefinition
    {
        public string Id { get; init; } = null!;
        public string Name { get; init; } = null!;
        public string Description { get; init; } = null!;
        public string Type { get; init; } = null!;

        public int Width { get; init; }
        public int Height { get; init; }

        public bool Stackable { get; init; }
        public int? MaxStack { get; init; }

        public string TextureUrl { get; init; } = null!;
    }
}
