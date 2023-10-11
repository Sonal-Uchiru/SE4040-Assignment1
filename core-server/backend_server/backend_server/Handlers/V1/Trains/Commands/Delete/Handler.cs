using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using MediatR;
using static backend_server.Constants.ErrorConstant;

namespace backend_server.Handlers.V1.Trains.Commands.Delete;

// Handler class for processing and handling commands to delete a train entity.
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
        // Retrieve the train to be deleted or throw a NotFoundException if it doesn't exist.
        var train = await _trainQuery.GetEntityByIdAsync(command.Id)
            ?? throw new NotFoundException(command.Id, nameof(Train));

        // Check if the train contains reservations, and if so, prevent deletion and raise a ValidationException.
        if (await _reservationQuery.IsTrainContainReservationByTrainIdAsync(command.Id))
        {
            throw new ValidationException(errorReason: TrainError.ReservationsContainedTrainDeleteError);
        }

        // Delete the train entity from the repository.
        await _trainRepository.DeleteAsync(command.Id);

        // Return a response indicating the successful deletion of the train entity.
        return new Response
        {
            Id = command.Id
        };
    }
}