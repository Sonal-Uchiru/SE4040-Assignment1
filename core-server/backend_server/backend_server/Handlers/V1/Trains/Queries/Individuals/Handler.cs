using backend_server.Queries.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Trains.Queries.Individuals;

public class Handler : IRequestHandler<Query, Response>
{
    private readonly ITrainQuery _trainQuery;

    public Handler(ITrainQuery trainQuery)
    {
        _trainQuery = trainQuery;
    }

    public async Task<Response> Handle(Query command, CancellationToken cancellationToken)
    {
        var train = await _trainQuery.GetEntityById(command.Id);

        if(train == null)
        {
            // not found response
            
        }

        return new Response
        {
            Item = train
        };
    }
}
