using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace backend_server.Handlers.V1.Users.Commands.Delete;

// Command class for a specific operation, with an ID that should not be bound from request data.
public class Command : IRequest<Response>
{
    [BindNever]
    public Guid Id { get; set; }
}