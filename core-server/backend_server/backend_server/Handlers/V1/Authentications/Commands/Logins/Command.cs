using MediatR;

namespace backend_server.Handlers.V1.Authentications.Logins;

public class Command : IRequest<Response>
{
	public string Nic { get; init; }

	public string Password { get; init; }
}