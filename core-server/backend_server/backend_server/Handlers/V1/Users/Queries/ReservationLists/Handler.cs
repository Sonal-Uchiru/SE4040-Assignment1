using backend_server.Queries.Interfaces;
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
        // Retrieve a list of reservations associated with the specified 'UserId' using the 'IReservationQuery'.
        var reservationList = await _reservationQuery.GetUserEntitiesAsync(command.UserId);

        return new Response
        {
            Items = reservationList
        };
    }
}