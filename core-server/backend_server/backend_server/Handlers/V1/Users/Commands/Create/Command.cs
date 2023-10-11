using backend_server.Models.Types;
using MediatR;

namespace backend_server.Handlers.V1.Users.Commands.Create;

// Represents a command for creating a user.
public class Command : IRequest<Response>
{
    public string Nic { get; init; } // User's NIC (National Identification Card)

    public string FirstName { get; init; } = ""; // User's first name (default empty string)

    public string LastName { get; init; } = ""; // User's last name (default empty string)

    public string Email { get; init; } = ""; // User's email address (default empty string)

    public int Mobile { get; init; } = 0; // User's mobile number (default 0)

    public string Password { get; init; } = ""; // User's password (default empty string)

    public UserRoles Role { get; init; } // User's role (BackOfficer, Traveller, Travel agent )
}