using AutoMapper;
using backend_server.Models.Dtos.Users;
using backend_server.Queries.Interfaces;
using backend_server.Services;
using MediatR;

namespace backend_server.Handlers.V1.Users.Queries.ReservationLists;

public class Handler : IRequestHandler<Query, Response>
{
    private readonly IReservationQuery _reservationQuery;

    public Handler(IReservationQuery reservationQuery)
    {
        _reservationQuery = reservationQuery;
    }

    public async Task<Response> Handle(Query command, CancellationToken cancellationToken)
    {
        var reservationList = await _reservationQuery.GetUserEntities(command.UserId);

        return new Response
        {
            Items = reservationList
        };
    }
}
