using System.Security.Cryptography;
using System.Text;
using backend_server.Services.Interfaces;

namespace backend_server.Services;

// UserService class for handling password hashing and verification.
public sealed class UserService : IUserService
{
    // Hashes the provided password using SHA-256.
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

    // Verifies a plain password against a hashed password.
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