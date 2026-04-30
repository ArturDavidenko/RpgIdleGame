using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IdleRpgApi.Middleware.ExceptionHandling
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            _logger.LogError(exception, "Unhandled exception occurred");

            var (statusCode, title) = exception switch
            {
                DomainException => (HttpStatusCode.BadRequest, "Domain error"),
                KeyNotFoundException => (HttpStatusCode.NotFound, "Not found"),
                _ => (HttpStatusCode.InternalServerError, "Server error")
            };

            var problemDetails = new ProblemDetails
            {
                Status = (int)statusCode,
                Title = title,
                Detail = exception.Message,
                Instance = httpContext.Request.Path
            };

            httpContext.Response.StatusCode = (int)statusCode;

            await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

            return true;
        }
    }
}
