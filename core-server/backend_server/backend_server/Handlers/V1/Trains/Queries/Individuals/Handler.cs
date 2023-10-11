using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Trains.Queries.Individuals;

// Handler class for processing and handling queries to retrieve information about a 'Train' entity by its unique identifier.
public class Handler : IRequestHandler<Query, Response>
{
    private readonly ITrainQuery _trainQuery;

    public Handler(ITrainQuery trainQuery)
    {
        _trainQuery = trainQuery;
    }

    public async Task<Response> Handle(Query command, CancellationToken cancellationToken)
    {
        // Retrieve the 'Train' entity by its unique identifier or throw a NotFoundException if it doesn't exist.
        var train = await _trainQuery.GetEntityByIdAsync(command.Id)
            ?? throw new NotFoundException(command.Id, nameof(Train));

        // Return a response containing the retrieved 'Train' entity.
        return new Response
        {
            Item = train
        };
    }
}