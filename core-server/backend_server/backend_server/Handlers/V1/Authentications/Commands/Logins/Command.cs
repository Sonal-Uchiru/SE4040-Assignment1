using MediatR;

namespace backend_server.Handlers.V1.Authentications.Commands.Logins;

// Represents a command for a specific operation and is used in the CQRS pattern.
// This command typically contains input data required to perform a specific action,
// and it returns a response of type 'Response' upon execution.
public class Command : IRequest<Response>
{
    public string Nic { get; init; } // Input data: Nic (National Identification Card)

    public string Password { get; init; } // Input data: User Password
}