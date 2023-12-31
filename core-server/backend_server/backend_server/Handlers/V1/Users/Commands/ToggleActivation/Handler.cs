﻿using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Users.Commands.ToggleActivation;

// Handler class for processing user activation toggle commands.
public class Handler : IRequestHandler<Command, Response>
{
    private readonly IUserRepository _userRepository;
    private readonly IUserQuery _userQuery;

    public Handler(IUserRepository userRepository, IUserQuery userQuery)
    {
        _userRepository = userRepository;
        _userQuery = userQuery;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        var user = await _userQuery.GetEntityByIdAsync(command.Id)
            ?? throw new NotFoundException(command.Id, nameof(User));

        // Toggle user activation status based on the current status.
        await _userRepository.ToggleActivationAsync(command.Id, !user.IsEnabled);

        return new Response
        {
            Id = command.Id
        };
    }
}