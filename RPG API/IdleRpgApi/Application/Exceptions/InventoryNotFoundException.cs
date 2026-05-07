using IdleRpgApi.Domain.Enums;

namespace IdleRpgApi.Application.Exceptions
{
    public class InventoryNotFoundException : Exception
    {
        public InventoryNotFoundException(Guid userId, InventoryType type)
       : base($"Inventory not found for user {userId} and type {type}")
        {
        }
    }
}
