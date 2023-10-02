using backend_server.Queries.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Reservations.Queries.Lists;

public class Handler : IRequestHandler<Query, Response>
{
    private readonly IReservationQuery _reservationQuery;

    public Handler(IReservationQuery reservationQuery)
    {
        _reservationQuery = reservationQuery;
    }

    public async Task<Response> Handle(Query command, CancellationToken cancellationToken)
    {
        var reservationList = await _reservationQuery.GetEntities();

        return new Response
        {
            Items = reservationList
        };
    }
}
