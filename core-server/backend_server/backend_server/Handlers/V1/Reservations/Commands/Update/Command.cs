using System.Text.Json.Serialization;
using MediatR;

namespace backend_server.Handlers.V1.Reservations.Commands.Update;

public class Command : IRequest<Response>
{
    [JsonIgnore]
    public Guid Id { get; set; }

    public int NoOfPassengers { get; set; }
}