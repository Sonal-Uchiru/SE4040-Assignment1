namespace backend_server.Services.Interfaces;

public interface IJwtService
{
    public string? GetToken(HttpContext context);
}