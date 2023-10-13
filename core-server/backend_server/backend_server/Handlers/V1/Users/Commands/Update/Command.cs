using System.Text.Json.Serialization;
using MediatR;

namespace backend_server.Handlers.V1.Users.Commands.Update;

// Command class for updating user information.
public class Command : IRequest<Response>
{
    // ID property to identify the user to be updated.
    [JsonIgnore]
    public Guid Id { get; set; }

    // First name of the user.
    public string FirstName { get; init; }

    // Last name of the user.
    public string LastName { get; init; }

    // Mobile number of the user.
    public int Mobile { get; init; }
}