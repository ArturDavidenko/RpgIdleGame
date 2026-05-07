using IdleRpgApi.Application.Exceptions;
using IdleRpgApi.Infrastructure.GameData;
using System.Text.Json;

namespace IdleRpgApi.Application.GameData
{
    public class ItemDefinitionRepository
    {
        private readonly Dictionary<string, ItemDefinition> _items;

        public ItemDefinitionRepository(IGameDataProvider provider)
        {
            var json = provider.GetItemDefinitionsJson();

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var items = JsonSerializer.Deserialize<List<ItemDefinition>>(json, options)!;

            if (items.Any(x => string.IsNullOrWhiteSpace(x.Id)))
                throw new ItemDefinitionLoadException("Invalid ItemDefinition JSON (missing id)");

            _items = items.ToDictionary(x => x.Id);
        }

        public ItemDefinition Get(string id) => _items[id];

        public IReadOnlyCollection<ItemDefinition> GetAll() => _items.Values;
    }
}
