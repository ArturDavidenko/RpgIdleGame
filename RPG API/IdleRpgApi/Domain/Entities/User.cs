namespace IdleRpgApi.Domain.Entities
{
    public class User
    {
        public Guid Id { get; private set; }
        public string Email { get; private set; }
        public string UserName { get; private set; }
        public string PasswordHash { get; private set; }
        public DateTime CreatedAt { get; private set; }
        private User() { } // EF Core

        public User(string email, string userName, string passwordHash)
        {
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email is required");

            if (email.Length > 100)
                throw new ArgumentException("Email too long");

            Email = email;
            PasswordHash = passwordHash;
            UserName = userName;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
