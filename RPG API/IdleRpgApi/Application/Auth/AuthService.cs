using IdleRpgApi.Application.Auth.DTOs;
using IdleRpgApi.Domain.Entities;
using IdleRpgApi.Infrastructure.Repositories.Interfaces;


namespace IdleRpgApi.Application.Auth
{
    public class AuthService : IAuthService
    {

        private readonly IUserRepository _userRepository;
        private readonly IJwtService _jwtService;

        public AuthService(IUserRepository userRepository, IJwtService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);

            if (user == null)
                throw new Exception("Invalid credentials");

            var isValid = BCrypt.Net.BCrypt.Verify(
                request.Password,
                user.PasswordHash
            );

            if (!isValid)
                throw new Exception("Invalid credentials");

            var token = _jwtService.GenerateToken(user);

            return new AuthResponse
            {
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    UserName = user.UserName
                }
            };
        }

        public async Task RegisterAsync(RegisterRequest request)
        {
            var existingEmailUser = await _userRepository.GetByEmailAsync(request.Email);
            if (existingEmailUser != null)
                throw new Exception("User email already exists");

            var existingUsernameUser = await _userRepository.GetByUserNameAsync(request.UserName);
            if (existingUsernameUser != null)
                throw new Exception("Username already exists");

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var user = new User(
                request.Email,
                request.UserName,
                passwordHash
            );

            await _userRepository.AddAsync(user);
        }
    }
}
