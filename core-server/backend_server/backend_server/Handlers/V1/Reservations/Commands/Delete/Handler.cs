using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using MediatR;
using static backend_server.Constants.ErrorConstant;

namespace backend_server.Handlers.V1.Reservations.Commands.Delete;

// Handler class for processing and handling commands to delete a reservation.
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
        // Retrieve the reservation to be deleted or throw a NotFoundException if it doesn't exist.
        var reservation = await _reservationQuery.GetEntityByIdAsync(command.Id)
            ?? throw new NotFoundException(command.Id, nameof(Reservation));

        // Calculate the time difference between the reservation date and the current date.
        TimeSpan difference = reservation.ReservationDate - DateTime.Now;

        // Check if the reservation deletion is allowed based on a time period condition.
        if (difference.TotalDays < 5)
        {
            // Throw a validation exception if the time period for deletion is invalid.
            throw new ValidationException(errorReason: ReservationError.InvalidTimePeriodReservationDeleteError);
        }

        // Delete the reservation from the repository.
        await _reservationRepository.DeleteAsync(command.Id);

        // Return a response indicating the successful deletion.
        return new Response
        {
            Id = command.Id
        };
    }
}