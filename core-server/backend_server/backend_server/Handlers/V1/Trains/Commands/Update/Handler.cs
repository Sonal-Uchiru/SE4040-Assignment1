using AutoMapper;
using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Trains.Commands.Update;

// Handler class for processing and handling commands to update train entity information.
public class Handler : IRequestHandler<Command, Response>
{
    private readonly ITrainRepository _trainRepository;
    private readonly ITrainQuery _trainQuery;
    private readonly IMapper _mapper;

    public Handler(ITrainRepository trainRepository, ITrainQuery trainQuery, IMapper mapper)
    {
        _trainRepository = trainRepository;
        _trainQuery = trainQuery;
        _mapper = mapper;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        // Retrieve the train to be updated or throw a NotFoundException if it doesn't exist.
        var train = await _trainQuery.GetEntityByIdAsync(command.Id)
            ?? throw new NotFoundException(command.Id, nameof(Train));

        // Map the updated information from the command to a new 'Train' entity.
        var updatedTrain = _mapper.Map<Train>(command);

        // Preserve the 'IsEnabled' status from the existing train.
        updatedTrain.IsEnabled = train.IsEnabled;

        // Replace the existing train entity with the updated information in the repository.
        await _trainRepository.ReplaceAsync(updatedTrain);

        // Return a response indicating the successful update of the train entity.
        return new Response
        {
            Id = command.Id
        };
    }
}