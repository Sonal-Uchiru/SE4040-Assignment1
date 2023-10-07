using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
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
        var train = await _trainQuery.GetEntityById(command.Id)
            ?? throw new NotFoundException(command.Id, nameof(Train));

        return new Response
        {
            Item = train
        };
    }
}
