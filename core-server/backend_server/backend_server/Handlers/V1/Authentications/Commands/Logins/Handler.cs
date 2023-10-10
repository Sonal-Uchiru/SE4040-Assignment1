﻿using backend_server.Models.Commons.Exceptions;
using backend_server.Queries.Interfaces;
using backend_server.Services.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Authentications.Commands.Logins;

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
        var user = await _userQuery.GetUserByNICAsync(command.Nic);

        if (user == null || !_userService.VerifyPassword(command.Password, user.PasswordHash))
        {
            throw new UnauthorizedException(errorResason: "Invalid Credentials");
        }

        return new Response
        {
            UserId = user.Id,
            Token = _authenticationService.GenerateJWT(user.Id, user.Role)
        };
    }
}

