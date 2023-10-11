using backend_server.Models.Commons.Exceptions;
using backend_server.Queries.Interfaces;
using backend_server.Services.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Authentications.Commands.Logins;

// Handler class for processing authentication commands.
public class Handler : IRequestHandler<Command, Response>
{
    private readonly IUserQuery _userQuery;
    private readonly IUserService _userService;
    private readonly IAuthenticationService _authenticationService;

    public Handler(IUserQuery userQuery, IUserService userService, IAuthenticationService authenticationService)
    {
        _userQuery = userQuery;
        _userService = userService;
        _authenticationService = authenticationService;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        // Attempt to retrieve a user by NIC (National Identification Card).
        var user = await _userQuery.GetUserByNICAsync(command.Nic);

        // If the user is not found or the provided password does not match the stored hash, throw an UnauthorizedException.
        if (user == null || !_userService.VerifyPassword(command.Password, user.PasswordHash))
        {
            throw new UnauthorizedException(errorResason: "Invalid Credentials");
        }

        // Generate an authentication token (JWT) for the user and return it in the response.
        return new Response
        {
            UserId = user.Id,
            Token = _authenticationService.GenerateJWT(user.Id, user.Role)
        };
    }
}