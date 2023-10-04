using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace backend_server.Handlers.V1.Users.Queries.ReservationLists;

public class Query : IRequest<Response>
{
    [BindNever]
    public Guid UserId { get; set; }
}