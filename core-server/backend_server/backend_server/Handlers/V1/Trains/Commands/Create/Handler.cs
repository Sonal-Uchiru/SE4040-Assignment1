using AutoMapper;
using backend_server.Models.DomainModels;
using backend_server.Repositories.Interfaces;
using backend_server.Services.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Trains.Commands.Create;

public class Handler : IRequestHandler<Command, Response>
{
    private readonly ITrainRepository _trainRepository;
    private readonly IMapper _mapper;

    public Handler(ITrainRepository trainRepository, IMapper mapper)
    {
        _trainRepository = trainRepository;
        _mapper = mapper;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        var id = Guid.NewGuid();

        var train = _mapper.Map<Train>(command);

        await _trainRepository.Add(train);

        return new Response
        {
            Id = id
        };
    }
}
