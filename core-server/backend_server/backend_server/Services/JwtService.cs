using backend_server.Services.Interfaces;

namespace backend_server.Services;

// JwtService class for extracting JWT tokens from the HTTP context.
public sealed class JwtService : IJwtService
{
    // Retrieves the JWT token from the HTTP context's Authorization header.
    public string? GetToken(HttpContext context)
    {
        var authorizationHeader = context.Request.Headers["Authorization"].FirstOrDefault();

        if (string.IsNullOrEmpty(authorizationHeader))
        {
            return null;
        }

        if (authorizationHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
        {
            return authorizationHeader["Bearer ".Length..].Trim();
        }

        return null;
    }
}