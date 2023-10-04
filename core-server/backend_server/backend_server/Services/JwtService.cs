using backend_server.Services.Interfaces;

namespace backend_server.Services;

public class JwtService : IJwtService
{
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

