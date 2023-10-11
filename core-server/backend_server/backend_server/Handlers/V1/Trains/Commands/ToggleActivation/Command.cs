using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace backend_server.Handlers.V1.Trains.Commands.ToggleActivation;

// Represents a command for a specific operation, excluding the 'Id' property from data binding.
public class Command : IRequest<Response>
{
    [BindNever]
    public Guid Id { get; set; }
}