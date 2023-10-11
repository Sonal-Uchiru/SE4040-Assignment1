using AutoMapper;
using backend_server.Models.Dtos.Users;
using backend_server.Queries.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Users.Queries.Lists;

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
        // Retrieve a list of users using the IUserQuery service.
        var userList = await _userQuery.GetEntitiesAsync();

        // Map the list of User objects to UserResponseDto objects.
        var userResponseList = _mapper.Map<List<UserResponseDto>>(userList);

        return new Response
        {
            // Populate the response with the list of mapped UserResponseDto objects.
            Items = userResponseList
        };
    }
}