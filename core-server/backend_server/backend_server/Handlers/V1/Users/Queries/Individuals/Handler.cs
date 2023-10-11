using AutoMapper;
using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Users;
using backend_server.Queries.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Users.Queries.Individuals;

public class Handler : IRequestHandler<Query, Response>
{
    private readonly IUserQuery _userQuery;
    private readonly IMapper _mapper;

    public Handler(IUserQuery userQuery, IMapper mapper)
    {
        _userQuery = userQuery;
        _mapper = mapper;
    }

    public async Task<Response> Handle(Query command, CancellationToken cancellationToken)
    {
        // Attempt to retrieve a user by the provided ID; if not found, throw a NotFoundException.
        var user = await _userQuery.GetEntityByIdAsync(command.Id)
            ?? throw new NotFoundException(command.Id, nameof(User));

        return new Response
        {
            // Map the user entity to a UserResponseDto.
            Item = _mapper.Map<UserResponseDto>(user)
        };
    }
}