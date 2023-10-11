using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace backend_server.Handlers.V1.Reservations.Commands.Delete;

// Represents a command for a specific operation, excluding the 'Id' property from model binding.
public class Command : IRequest<Response>
{
    [BindNever]
    public Guid Id { get; set; } // Unique identifier, excluded from model binding
}