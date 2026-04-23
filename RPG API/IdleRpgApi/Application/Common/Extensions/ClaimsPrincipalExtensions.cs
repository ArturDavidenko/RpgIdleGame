using System.Security.Claims;

namespace IdleRpgApi.Application.Common.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static Guid GetUserId(this ClaimsPrincipal user)
        {
            var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                throw new Exception("User ID not found in token");

            return Guid.Parse(userId);
        }
    }
}
