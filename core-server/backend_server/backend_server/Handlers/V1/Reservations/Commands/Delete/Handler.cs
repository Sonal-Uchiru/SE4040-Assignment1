using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Reservations.Commands.Delete;

public class Handler : IRequestHandler<Command, Response>
{
    private readonly IReservationRepository _reservationRepository;
    private readonly IReservationQuery _reservationQuery;

    public Handler(IReservationRepository reservationRepository, IReservationQuery resrvationQuery)
    {
        _reservationRepository = reservationRepository;
        _reservationQuery = resrvationQuery;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        _ = await _reservationQuery.GetEntityById(command.Id)
            ?? throw new NotFoundException(command.Id, typeof(Reservation).ToString());

        await _reservationRepository.Delete(command.Id);

        return new Response
        {
            Id = command.Id
        };
    }
}
