using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace backend_server.Handlers.V1.Users.Commands.ToggleActivation;

// Command for deleting a user by their ID.
public class Command : IRequest<Response>
{
    [BindNever]
    public Guid Id { get; set; }
}