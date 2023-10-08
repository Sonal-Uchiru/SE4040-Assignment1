using System.Security.Cryptography;
using System.Text;
using backend_server.Services.Interfaces;

namespace backend_server.Services;

public sealed class UserService : IUserService
{
    public string HashPassword(string password)
    {
        var passwordBytes = Encoding.UTF8.GetBytes(password);

        var hashBytes = SHA256.HashData(passwordBytes);

        var builder = new StringBuilder();

        foreach (byte hashByte in hashBytes)
        {
            builder.Append(hashByte.ToString("x2"));
        }

        return builder.ToString();
    }

    public bool VerifyPassword(string plainPassword, string hashedPassword)
    {

        var userPasswordBytes = Encoding.UTF8.GetBytes(plainPassword);

        var userHashBytes = SHA256.HashData(userPasswordBytes);

        var builder = new StringBuilder();

        foreach (byte userHashByte in userHashBytes)
        {
            builder.Append(userHashByte.ToString("x2"));
        }

        return builder.ToString() == hashedPassword;
    }
}

