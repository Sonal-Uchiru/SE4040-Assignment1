using System.Text.Json.Serialization;
using MediatR;

namespace backend_server.Handlers.V1.Reservations.Commands.Update;

// Represents a command for a specific operation, including the number of passengers.
public class Command : IRequest<Response>
{
    [JsonIgnore]
    public Guid Id { get; set; } // Unique identifier, excluded from JSON serialization

    public int NoOfPassengers { get; set; } // Number of passengers for the operation
}