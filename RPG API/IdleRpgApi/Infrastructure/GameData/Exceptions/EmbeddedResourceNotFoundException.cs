namespace IdleRpgApi.Infrastructure.GameData.Exceptions
{
    public class EmbeddedResourceNotFoundException : Exception
    {
        public EmbeddedResourceNotFoundException(string resourceName)
        : base($"Resource not found: {resourceName}") { }
    }
}
