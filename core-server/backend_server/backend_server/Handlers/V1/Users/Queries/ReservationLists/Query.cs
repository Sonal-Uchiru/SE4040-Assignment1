using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace backend_server.Handlers.V1.Users.Queries.ReservationLists;

public class Query : IRequest<Response>
{
    // The 'UserId' property represents the unique identifier of the user associated with the query.
    [BindNever]
    public Guid UserId { get; set; }
}