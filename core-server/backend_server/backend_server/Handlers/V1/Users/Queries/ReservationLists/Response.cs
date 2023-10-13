using backend_server.Models.Commons.Responses;
using backend_server.Models.DomainModels;

namespace backend_server.Handlers.V1.Users.Queries.ReservationLists;

public class Response : BaseResponse
{
    // The 'Items' property represents a list of Reservation objects.
    public required List<Reservation> Items { get; init; }
}