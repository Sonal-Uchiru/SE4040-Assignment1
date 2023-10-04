using System.Text.Json.Serialization;
using MediatR;

namespace backend_server.Handlers.V1.Reservations.Commands.Create;

public class Command : IRequest<Response>
{
    public string TrainName { get; set; }

    public string StartingStation { get; set; }

    public string EndingStation { get; set; }

    public string DepartureDate { get; set; }

    public string ArrivalTime { get; set; }

    public string DepartureTime { get; set; }

    public int NoOfPassengers { get; set; }

    public double PerPersonPrice { get; set; }

    [JsonIgnore]
    public Guid UserId { get; set; }
}