namespace backend_server.Middlewares.Extensions;

public static class ErrorHandlingMiddlewareExtension
{
    // This extension method enables the use of custom error handling middleware in the application pipeline.
    public static IApplicationBuilder UseErrorHandlingMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ExceptionHandler>();
    }
}