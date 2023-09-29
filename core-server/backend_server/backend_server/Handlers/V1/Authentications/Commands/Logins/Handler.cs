using backend_server.Queries.Interfaces;
using backend_server.Services.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Authentications.Logins;

public class Handler : IRequestHandler<Command, Response>
{
    private readonly IUserQuery _userQuery;
    private readonly IUserService _userService;

	public Handler(IUserQuery userQuery, IUserService userService)
    {
        _userQuery = userQuery;
        _userService = userService;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        var user = await _userQuery.GetUserByNIC(command.Nic);

        if (user == null)
        {
            return new Response
            {
                Token = "Invalid Credentials! s"
            };
        }

        if(!_userService.VerifyPassword(command.Password, user.PasswordHash))
        {
            return new Response
            {
                Token = "Invalid Credentials!"
            };
        }

        return new Response
        {
            Token = "new token"
        };
    }
}

