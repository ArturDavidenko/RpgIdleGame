namespace IdleRpgApi.Application.Exceptions
{
    public class InvalidInventoryCommandException : Exception
    {
        public InvalidInventoryCommandException(string message)
        : base(message)
        {
        }
    }
}
