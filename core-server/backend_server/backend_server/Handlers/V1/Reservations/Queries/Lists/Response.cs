using backend_server.Models.Commons.Responses;
using backend_server.Models.DomainModels;

namespace backend_server.Handlers.V1.Reservations.Queries.Lists;

// Represents a response object typically used for operations that return a list of Reservation items.
public class Response : BaseResponse
{
    public required List<Reservation> Items { get; init; } // List of Reservation items
}