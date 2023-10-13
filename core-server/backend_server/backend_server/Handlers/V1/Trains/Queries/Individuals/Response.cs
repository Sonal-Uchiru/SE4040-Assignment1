using backend_server.Models.Commons.Responses;
using backend_server.Models.DomainModels;

namespace backend_server.Handlers.V1.Trains.Queries.Individuals;

// Represents a response object typically used for operations that return a single 'Train' entity.
public class Response : BaseResponse
{
    public required Train Item { get; init; } // The 'Train' entity included in the response
}