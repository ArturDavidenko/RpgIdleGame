namespace IdleRpgApi.Application.Auth.DTOs
{
    public class AuthResponse
    {
        public string Token { get; set; } = null!;
        public UserDto User { get; set; } = null!;
    }
}
