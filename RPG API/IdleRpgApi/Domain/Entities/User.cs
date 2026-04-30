using IdleRpgApi.Middleware.ExceptionHandling;

namespace IdleRpgApi.Domain.Entities
{
    public class User
    {
        public Guid Id { get; private set; }
        public string Email { get; private set; }
        public string UserName { get; private set; }
        public string PasswordHash { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public Inventory? Inventory { get; private set; }
        private User() { }

        public User(string email, string userName, string passwordHash)
        {
            if (string.IsNullOrWhiteSpace(email))
                throw new DomainException("Email is required");

            if (string.IsNullOrWhiteSpace(userName))
                throw new DomainException("Username is required");

            if (string.IsNullOrWhiteSpace(passwordHash))
                throw new DomainException("Password hash is required");

            Email = email;
            PasswordHash = passwordHash;
            UserName = userName;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
