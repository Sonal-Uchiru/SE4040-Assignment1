using AutoMapper;
using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Users;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using backend_server.Services.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Users.Commands.Update;

// Handler for updating user information based on the provided command.
public class Handler : IRequestHandler<Command, Response>
{
    private readonly IUserService _userService;
    private readonly IUserRepository _userRepository;
    private readonly IUserQuery _userQuery;
    private readonly IMapper _mapper;

    public Handler(IUserService userService, IUserRepository userRepository, IUserQuery userQuery, IMapper mapper)
    {
        _userService = userService;
        _userRepository = userRepository;
        _userQuery = userQuery;
        _mapper = mapper;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        // Retrieve the user entity to be updated or throw an exception if it doesn't exist.
        _ = await _userQuery.GetEntityByIdAsync(command.Id)
            ?? throw new NotFoundException(command.Id, nameof(User));

        // Map the command to an UpdateUserDto using AutoMapper.
        var updateUserDto = _mapper.Map<UpdateUserDto>(command);

        // Update the user's information in the repository.
        await _userRepository.UpdateAsync(command.Id, updateUserDto);

        return new Response
        {
            Id = command.Id
        };
    }
}