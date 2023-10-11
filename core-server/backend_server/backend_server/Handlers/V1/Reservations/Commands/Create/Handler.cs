using AutoMapper;
using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Repositories.Interfaces;
using MediatR;
using static backend_server.Constants.ErrorConstant;

namespace backend_server.Handlers.V1.Reservations.Commands.Create;

// Handler class for processing and handling commands to create train reservations.
public class Handler : IRequestHandler<Command, Response>
{
    private readonly IReservationRepository _reservationRepository;
    private readonly IMapper _mapper;

    public Handler(IReservationRepository reservationRepository, IMapper mapper)
    {
        _reservationRepository = reservationRepository;
        _mapper = mapper;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        // Validate the command data to ensure it meets business rules.
        Validate(command);

        // Generate a unique identifier for the reservation.
        var id = Guid.NewGuid();

        // Map the data from the command to a Reservation object.
        var reservation = _mapper.Map<Reservation>(command);

        // Set the generated unique identifier for the reservation.
        reservation.Id = id;

        // Persist the reservation data to the repository.
        await _reservationRepository.AddAsync(reservation);

        // Return a response containing the reservation's unique identifier.
        return new Response
        {
            Id = id
        };
    }

    // Validates the provided command data against business rules.
    private void Validate(Command command)
    {
        if (command.NoOfPassengers > 4)
        {
            // Throw a validation exception if the number of passengers exceeds the maximum allowed.
            throw new ValidationException(errorReason: ReservationError.MaximumPasengersError);
        }

        TimeSpan difference = command.ReservationDate - DateTime.Now;

        if (difference.TotalDays > 30)
        {
            // Throw a validation exception if the reservation date is more than 30 days in the future.
            throw new ValidationException(errorReason: ReservationError.OutOfRangeReservationDateError);
        }
    }
}