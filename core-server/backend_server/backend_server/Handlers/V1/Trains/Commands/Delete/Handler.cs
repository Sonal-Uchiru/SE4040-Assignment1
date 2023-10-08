using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using MediatR;
using static backend_server.Constants.ErrorConstant;

namespace backend_server.Handlers.V1.Trains.Commands.Delete;

public class Handler : IRequestHandler<Command, Response>
{
    private readonly ITrainRepository _trainRepository;
    private readonly ITrainQuery _trainQuery;
    private readonly IReservationQuery _reservationQuery;

    public Handler(ITrainRepository trainRepository, ITrainQuery trainQuery, IReservationQuery reservationQuery)
    {
        _trainRepository = trainRepository;
        _trainQuery = trainQuery;
        _reservationQuery = reservationQuery;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        var train = await _trainQuery.GetEntityByIdAsync(command.Id)
            ?? throw new NotFoundException(command.Id, nameof(Train));

        if (await _reservationQuery.IsTrainContainReservationByTrainIdAsync(command.Id))
        {
            throw new ValidationException(errorReason: TrainError.ReservationsContainedTrainDeleteError);
        }

        await _trainRepository.DeleteAsync(command.Id);

        return new Response
        {
            Id = command.Id
        };
    }
}
