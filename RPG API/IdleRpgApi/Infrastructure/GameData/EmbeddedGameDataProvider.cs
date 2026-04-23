using System.Reflection;

namespace IdleRpgApi.Infrastructure.GameData
{
    public class EmbeddedGameDataProvider : IGameDataProvider 
    {
        public string GetItemDefinitionsJson()
        {
            var assembly = Assembly.GetExecutingAssembly();

            var resourceName = "IdleRpgApi.Infrastructure.GameData.EmbeddedResources.items-definitions.json";

            using var stream = assembly.GetManifestResourceStream(resourceName);

            if (stream == null)
                throw new Exception($"Resource not found: {resourceName}");

            using var reader = new StreamReader(stream);

            return reader.ReadToEnd();
        }
    }
}
