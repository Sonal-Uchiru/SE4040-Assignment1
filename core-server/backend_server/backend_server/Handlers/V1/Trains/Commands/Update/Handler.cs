using AutoMapper;
using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Trains.Commands.Update;

public class Handler : IRequestHandler<Command, Response>
{
    private readonly ITrainRepository _trainRepository;
    private readonly ITrainQuery _trainQuery;
    private readonly IMapper _mapper;

    public Handler(ITrainRepository trainRepository,ITrainQuery trainQuery, IMapper mapper)
    {
        _trainRepository = trainRepository;
        _trainQuery = trainQuery;
        _mapper = mapper;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        var train = await _trainQuery.GetEntityById(command.Id);

        if(train == null)
        {
            return new Response
            {
                Id = command.Id
            };
        }

        var updatedTrain = _mapper.Map<Train>(command);

        updatedTrain.IsEnabled = train.IsEnabled;

        await _trainRepository.Replace(updatedTrain);

        return new Response
        {
            Id = command.Id
        };
    }
}
