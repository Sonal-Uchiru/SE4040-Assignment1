using AutoMapper;
using backend_server.Models.DomainModels;
using backend_server.Repositories.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Trains.Commands.Create;

// Handler class for processing and handling commands to create a new train entity.
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
        // Generate a new unique identifier for the train entity.
        var id = Guid.NewGuid();

        // Map the command to a Train entity.
        var train = _mapper.Map<Train>(command);

        // Set the identifier for the new train entity.
        train.Id = id;

        // Add the new train entity to the repository.
        await _trainRepository.AddAsync(train);

        // Return a response indicating the successful creation of the train entity.
        return new Response
        {
            Id = id
        };
    }
}