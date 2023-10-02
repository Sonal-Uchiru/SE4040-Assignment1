namespace backend_server.Services.Interfaces;

public interface IUserService
{
    string HashPassword(string password);

    bool VerifyPassword(string plainPassword, string hashedPassword);
}
