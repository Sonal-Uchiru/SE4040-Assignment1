using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace backend_server.Handlers.V1.Users.Queries.Individuals;

public class Query : IRequest<Response>
{
    [BindNever]
    public Guid Id { get; set; }
}