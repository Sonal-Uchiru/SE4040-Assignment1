using backend_server.Models.Types;
using MediatR;

namespace backend_server.Handlers.V1.Users.Commands.Update;

public class Command : IRequest<Response>
{
    public string Nic { get; init; }

    public string FirstName { get; init; }

    public string LastName { get; init; }

    public string Email { get; init; }

    public int Mobile { get; init; }

    public string Password { get; init; }

    public UserRoles Role { get; init; }
}