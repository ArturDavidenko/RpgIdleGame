using IdleRpgApi.Application.Auth.DTOs;

namespace IdleRpgApi.Application.Auth
{
    public interface IAuthService
    {
        Task<string> LoginAsync(LoginRequest request);
        Task RegisterAsync(RegisterRequest request);
    }
}
