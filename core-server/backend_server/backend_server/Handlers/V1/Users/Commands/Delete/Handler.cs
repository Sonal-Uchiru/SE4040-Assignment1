using AutoMapper;
using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Users.Commands.Delete;

// Handler for deleting a user by ID.
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
        // Check if the user exists, if not, throw a NotFoundException.
        _ = await _userQuery.GetEntityByIdAsync(command.Id)
            ?? throw new NotFoundException(command.Id, nameof(User));

        // Delete the user.
        await _userRepository.DeleteAsync(command.Id);

        return new Response
        {
            Id = command.Id
        };
    }
}