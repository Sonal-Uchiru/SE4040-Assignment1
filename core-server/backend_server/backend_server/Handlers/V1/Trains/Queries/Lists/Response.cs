using backend_server.Models.Commons.Responses;
using backend_server.Models.DomainModels;

namespace backend_server.Handlers.V1.Trains.Queries.Lists;

// Represents a response object containing a list of 'Train' entities.
public class Response : BaseResponse
{
    public required List<Train> Items { get; init; } // List of 'Train' entities in the response
}