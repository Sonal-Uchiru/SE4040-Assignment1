using AutoMapper;
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
        var user = await _userQuery.GetEntityByIdAsync(command.Id);

        if(user == null)
        {
            // not found response
        }

        return new Response
        {
            Item = _mapper.Map<UserResponseDto>(user)
        };
    }
}
