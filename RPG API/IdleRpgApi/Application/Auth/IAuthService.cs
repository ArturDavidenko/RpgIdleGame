using IdleRpgApi.Application.Auth.DTOs;

namespace IdleRpgApi.Application.Auth
{
    public interface IAuthService
    {
        Task<AuthResponse> LoginAsync(LoginRequest request);
        Task RegisterAsync(RegisterRequest request);
    }
}
