using backend_server.Models.Commons.Exceptions;
using backend_server.Models.Commons.Responses;

namespace backend_server.Middlewares;

public class ExceptionHandler
{
    private readonly RequestDelegate _next;

    public ExceptionHandler(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (UnauthorizedException unauthorizedException)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Response.ContentType = "application/json";

            // Create a JSON response with the error message
            var errorMessage = new UnAuthorizedResponse(unauthorizedException.ErrorReason);
         
            await context.Response.WriteAsync(System.Text.Json.JsonSerializer.Serialize(errorMessage));
        }
        catch (NotFoundException notFoundException)
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            context.Response.ContentType = "application/json";

            // Create a JSON response with the error message
            var errorMessage = new NotFoundResponse(notFoundException.Id, notFoundException.ObjectName);

            await context.Response.WriteAsync(System.Text.Json.JsonSerializer.Serialize(errorMessage));
        }
        catch (Exception ex)
        {
            // Handle other types of exceptions here
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";

            // Create a JSON response with a generic error message
            var errorMessage = new
            {
                Message = "An internal server error occurred."
            };

            await context.Response.WriteAsync(System.Text.Json.JsonSerializer.Serialize(errorMessage));
        }
    }
}

public static class ErrorHandlingMiddlewareExtensions
{
    public static IApplicationBuilder UseErrorHandlingMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ExceptionHandler>();
    }
}

