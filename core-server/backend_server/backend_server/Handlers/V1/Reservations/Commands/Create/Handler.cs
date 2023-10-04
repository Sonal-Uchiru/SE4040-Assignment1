using AutoMapper;
using backend_server.Models.DomainModels;
using backend_server.Repositories.Interfaces;
using MediatR;

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
        var id = Guid.NewGuid();

        var reservation = _mapper.Map<Reservation>(command);

        reservation.Id = id;

        await _reservationRepository.Add(reservation);

        return new Response
        {
            Id = id
        };
    }
}
