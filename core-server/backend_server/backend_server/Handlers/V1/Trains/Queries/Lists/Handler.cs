using backend_server.Queries.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Trains.Queries.Lists;

public class Handler : IRequestHandler<Query, Response>
{
    private readonly ITrainQuery _trainQuery;

    public Handler(ITrainQuery trainQuery)
    {
        _trainQuery = trainQuery;
    }

    public async Task<Response> Handle(Query command, CancellationToken cancellationToken)
    {
        var trainList = await _trainQuery.GetEntities();

        return new Response
        {
            Items = trainList
        };
    }
}
