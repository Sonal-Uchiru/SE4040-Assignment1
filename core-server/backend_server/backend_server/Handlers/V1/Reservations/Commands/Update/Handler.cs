using AutoMapper;
using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Reservations;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using MediatR;
using static backend_server.Constants.ErrorConstant;

namespace backend_server.Handlers.V1.Reservations.Commands.Update;

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
        if(command.NoOfPassengers > 4)
        {
            throw new ValidationException(errorReason: ReservationError.MaximumPasengersError);
        }

        var reservation = await _reservationQuery.GetEntityById(command.Id)
            ?? throw new NotFoundException(command.Id, nameof(Reservation));

        TimeSpan difference = reservation.ReservationDate - DateTime.Now;

        if (difference.TotalDays < 5)
        {
            throw new ValidationException(errorReason: ReservationError.InvalidTimePeriodReservationUpdateError);
        }

        var updateReservationDot = _mapper.Map<UpdateReservationDto>(command);

        await _reservationRepository.UpdateNoOfPassengers(updateReservationDot);

        return new Response
        {
            Id = command.Id
        };
    }
}
