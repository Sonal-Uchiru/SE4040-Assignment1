using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace backend_server.Handlers.V1.Users.Queries.Individuals;

// Query class for retrieving a user by ID.
public class Query : IRequest<Response>
{
    [BindNever]
    public Guid Id { get; set; }
}