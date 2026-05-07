using IdleRpgApi.Middleware.ExceptionHandling;

namespace IdleRpgApi.Application.Exceptions
{
    public class ItemPlacementException : DomainException
    {
        public ItemPlacementException()
        : base("Cannot place item here")
        {
        }
    }
}
