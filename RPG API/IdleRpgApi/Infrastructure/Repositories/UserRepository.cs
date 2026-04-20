using IdleRpgApi.Domain.Entities;
using IdleRpgApi.Infrastructure.Persistence;
using IdleRpgApi.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IdleRpgApi.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetByUserNameAsync(string userName)
        {
            return await _context.Users
            .FirstOrDefaultAsync(u => u.UserName == userName);
        }
    }
}
