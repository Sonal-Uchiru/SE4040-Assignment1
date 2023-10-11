using backend_server.Queries.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Trains.Queries.Lists;

// Handler class for processing and handling queries to retrieve a list of 'Train' entities.
public class Handler : IRequestHandler<Query, Response>
{
    private readonly ITrainQuery _trainQuery;

    public Handler(ITrainQuery trainQuery)
    {
        _trainQuery = trainQuery;
    }

    public async Task<Response> Handle(Query command, CancellationToken cancellationToken)
    {
        // Retrieve a list of 'Train' entities.
        var trainList = await _trainQuery.GetEntitiesAsync();

        // Return a response containing the list of 'Train' entities.
        return new Response
        {
            Items = trainList
        };
    }
}