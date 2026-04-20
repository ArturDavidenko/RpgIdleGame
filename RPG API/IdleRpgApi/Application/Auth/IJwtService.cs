using IdleRpgApi.Domain.Entities;

namespace IdleRpgApi.Application.Auth
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
