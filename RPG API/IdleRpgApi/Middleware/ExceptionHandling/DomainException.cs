namespace IdleRpgApi.Middleware.ExceptionHandling
{
    public class DomainException : Exception
    {
        public DomainException(string message) : base(message) { }
    }
}
