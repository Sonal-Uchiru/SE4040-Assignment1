using AutoMapper;
using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Repositories.Interfaces;
using MediatR;
using static backend_server.Constants.ErrorConstant;

namespace backend_server.Handlers.V1.Reservations.Commands.Create;

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
        Validate(command);

        var id = Guid.NewGuid();

        var reservation = _mapper.Map<Reservation>(command);

        reservation.Id = id;

        await _reservationRepository.AddAsync(reservation);

        return new Response
        {
            Id = id
        };
    }

    private void Validate(Command command)
    {
        if (command.NoOfPassengers > 4)
        {
            throw new ValidationException(errorReason: ReservationError.MaximumPasengersError);
        }

        TimeSpan difference = command.ReservationDate - DateTime.Now;

        if (difference.TotalDays > 30)
        {
            throw new ValidationException(errorReason: ReservationError.OutOfRangeReservationDateError);
        }
    }
}
