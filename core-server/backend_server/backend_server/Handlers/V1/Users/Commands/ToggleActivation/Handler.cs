using AutoMapper;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using backend_server.Services.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Users.Commands.ToggleActivation;

public class Handler : IRequestHandler<Command, Response>
{
    private readonly IUserRepository _userRepository;
    private readonly IUserQuery _userQuery;

    public Handler(IUserRepository userRepository,IUserQuery userQuery)
    {
        _userRepository = userRepository;
        _userQuery = userQuery;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        var user = await _userQuery.GetEntityByIdAsync(command.Id);

        if(user == null)
        {
            return new Response
            {
                Id = command.Id
            };
        }

        await _userRepository.ToggleActivationAsync(command.Id, !user.IsEnabled);

        return new Response
        {
            Id = command.Id
        };
    }
}
