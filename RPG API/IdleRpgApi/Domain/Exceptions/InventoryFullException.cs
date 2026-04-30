using IdleRpgApi.Middleware.ExceptionHandling;

namespace IdleRpgApi.Domain.Exceptions
{
    public class InventoryFullException : DomainException
    {
        public InventoryFullException()
            : base("Inventory is full") { }
    }
}
