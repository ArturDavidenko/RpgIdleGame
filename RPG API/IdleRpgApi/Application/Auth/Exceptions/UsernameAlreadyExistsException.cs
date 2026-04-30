namespace IdleRpgApi.Application.Auth.Exceptions
{
    public class UsernameAlreadyExistsException : Exception
    {
        public UsernameAlreadyExistsException(string username)
            : base($"User with username '{username}' already exists.") { }
    }
}
