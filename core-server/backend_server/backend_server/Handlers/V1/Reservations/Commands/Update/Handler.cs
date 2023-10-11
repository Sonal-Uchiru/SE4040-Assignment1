using AutoMapper;
using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Reservations;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using MediatR;
using static backend_server.Constants.ErrorConstant;

namespace backend_server.Handlers.V1.Reservations.Commands.Update;

// Handler class for processing and handling commands to update a reservation.
public class Handler : IRequestHandler<Command, Response>
{
    private readonly IReservationRepository _reservationRepository;
    private readonly IReservationQuery _reservationQuery;
    private readonly IMapper _mapper;

    public Handler(IReservationRepository reservationRepository, IReservationQuery reservationQuery, IMapper mapper)
    {
        _reservationRepository = reservationRepository;
        _reservationQuery = reservationQuery;
        _mapper = mapper;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        // Validate the number of passengers against a business rule.
        if (command.NoOfPassengers > 4)
        {
            throw new ValidationException(errorReason: ReservationError.MaximumPasengersError);
        }

        // Retrieve the reservation to be updated or throw a NotFoundException if it doesn't exist.
        var reservation = await _reservationQuery.GetEntityByIdAsync(command.Id)
            ?? throw new NotFoundException(command.Id, nameof(Reservation));

        // Calculate the time difference between the reservation date and the current date.
        TimeSpan difference = reservation.ReservationDate - DateTime.Now;

        // Check if the reservation update is allowed based on a time period condition.
        if (difference.TotalDays < 5)
        {
            throw new ValidationException(errorReason: ReservationError.InvalidTimePeriodReservationUpdateError);
        }

        // Map the command to an UpdateReservationDto.
        var updateReservationDto = _mapper.Map<UpdateReservationDto>(command);

        // Update the number of passengers in the reservation.
        await _reservationRepository.UpdateNoOfPassengersAsync(updateReservationDto);

        // Return a response indicating the successful update.
        return new Response
        {
            Id = command.Id
        };
    }
}