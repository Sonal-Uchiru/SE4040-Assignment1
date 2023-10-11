using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using MediatR;
using static backend_server.Constants.ErrorConstant;

namespace backend_server.Handlers.V1.Trains.Commands.ToggleActivation;

// Handler class for processing and handling commands to toggle the activation status of a train entity.
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
        // Retrieve the train to be activated or deactivated or throw a NotFoundException if it doesn't exist.
        var train = await _trainQuery.GetEntityByIdAsync(command.Id)
            ?? throw new NotFoundException(command.Id, nameof(Train));

        // Check if the train contains reservations, and if so, prevent activation/deactivation and raise a ValidationException.
        if (await _reservationQuery.IsTrainContainReservationByTrainIdAsync(command.Id))
        {
            throw new ValidationException(errorReason: TrainError.ReservationsContainedTrainCancelError);
        }

        // Toggle the activation status of the train entity and update it in the repository.
        await _trainRepository.ToggleActivationAsync(command.Id, !train.IsEnabled);

        // Return a response indicating the successful activation or deactivation of the train entity.
        return new Response
        {
            Id = command.Id
        };
    }
}