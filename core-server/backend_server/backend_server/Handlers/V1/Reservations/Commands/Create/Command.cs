using System.Text.Json.Serialization;
using MediatR;

namespace backend_server.Handlers.V1.Reservations.Commands.Create;

// Represents a command for creating or updating a train reservation.
public class Command : IRequest<Response>
{
    public Guid TrainId { get; set; }           // Identifier of the train

    public string TrainName { get; set; }       // Name of the train

    public string StartingStation { get; set; } // Departure station

    public string EndingStation { get; set; }   // Arrival station

    public string DepartureDate { get; set; }   // Departure date

    public string ArrivalTime { get; set; }     // Arrival time

    public string DepartureTime { get; set; }   // Departure time

    public int NoOfPassengers { get; set; }     // Number of passengers

    public double PerPersonPrice { get; set; }  // Price per person

    public DateTime ReservationDate { get; set; } // Date of the reservation

    [JsonIgnore]
    public Guid UserId { get; set; } // User identifier (usually not included in the request, but set by the server)
}