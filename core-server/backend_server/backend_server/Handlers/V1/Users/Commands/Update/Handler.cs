using AutoMapper;
using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Users;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using backend_server.Services.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Users.Commands.Update;

public class Handler : IRequestHandler<Command, Response>
{
    private readonly IUserService _userService;
    private readonly IUserRepository _userRepository;
    private readonly IUserQuery _userQuery;
    private readonly IMapper _mapper;

    public Handler(IUserService userService, IUserRepository userRepository,IUserQuery userQuery, IMapper mapper)
    {
        _userService = userService;
        _userRepository = userRepository;
        _userQuery = userQuery;
        _mapper = mapper;
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

        var updateUserDto = _mapper.Map<UpdateUserDto>(command);

        await _userRepository.Update(command.Id, updateUserDto);

        return new Response
        {
            Id = command.Id
        };
    }
}
