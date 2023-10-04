using AutoMapper;
using backend_server.Models.Dtos.Reservations;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using MediatR;

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
        var reservation = await _reservationQuery.GetEntityById(command.Id);

        if(reservation == null)
        {
            return new Response
            {
                Id = command.Id
            };
        }

        var updateReservationDot = _mapper.Map<UpdateReservationDto>(command);

        await _reservationRepository.UpdateNoOfPassengers(updateReservationDot);

        return new Response
        {
            Id = command.Id
        };
    }
}
