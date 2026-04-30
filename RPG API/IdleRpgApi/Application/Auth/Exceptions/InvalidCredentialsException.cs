namespace IdleRpgApi.Application.Auth.Exceptions
{
    public class InvalidCredentialsException : Exception
    {
        public InvalidCredentialsException()
        : base("Invalid credentials") { }
    }
}
