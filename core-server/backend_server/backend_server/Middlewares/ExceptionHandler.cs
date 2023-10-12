using backend_server.Models.Commons.Exceptions;
using backend_server.Models.Commons.Responses;

namespace backend_server.Middlewares;

public class ExceptionHandler
{
    private readonly RequestDelegate _next;

    private static readonly ErrorResponse InternalServerErrorResponse = new()
    {
        Message = "Internal server error."
    };

    public ExceptionHandler(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            context.Response.ContentType = "application/json";
            await _next(context);
        }
        catch (UnauthorizedException unauthorizedException)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;

            // Handle and respond to unauthorized exceptions with a 401 status code.
            await context.Response.WriteAsJsonAsync(new UnAuthorizedResponse(unauthorizedException.ErrorReason));
        }
        catch (NotFoundException notFoundException)
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;

            // Handle and respond to not found exceptions with a 404 status code.
            await context.Response.WriteAsJsonAsync(new NotFoundResponse(notFoundException.Id, notFoundException.ObjectName));
        }
        catch (ValidationException validationException)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;

            // Handle and respond to validation exceptions with a 400 status code.
            await context.Response.WriteAsJsonAsync(new ErrorResponse
            {
                Message = validationException.ErrorReason
            });
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            Console.Write(ex);

            // Handle and respond to internal server errors with a 500 status code.
            await context.Response.WriteAsJsonAsync(InternalServerErrorResponse);
        }
    }
}