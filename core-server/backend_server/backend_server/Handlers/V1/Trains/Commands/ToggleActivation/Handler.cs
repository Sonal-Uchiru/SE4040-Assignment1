using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Trains.Commands.ToggleActivation;

public class Handler : IRequestHandler<Command, Response>
{
    private readonly ITrainRepository _trainRepository;
    private readonly ITrainQuery _trainQuery;

    public Handler(ITrainRepository trainRepository,ITrainQuery trainQuery)
    {
        _trainRepository = trainRepository;
        _trainQuery = trainQuery;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        var train = await _trainQuery.GetEntityById(command.Id)
            ?? throw new NotFoundException(command.Id, nameof(Train));

        await _trainRepository.ToggleActivation(command.Id, !train.IsEnabled);

        return new Response
        {
            Id = command.Id
        };
    }
}