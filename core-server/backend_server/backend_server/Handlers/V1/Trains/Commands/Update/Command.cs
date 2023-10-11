using System.Text.Json.Serialization;
using backend_server.Models.DomainModels;
using MediatR;

namespace backend_server.Handlers.V1.Trains.Commands.Update;

// Represents a command for creating or updating a train entity.
public class Command : IRequest<Response>
{
    [JsonIgnore]
    public Guid Id { get; set; } // Unique identifier of the train entity (ignored for creation)

    public string Name { get; set; } // Name of the train

    public string Model { get; set; } // Model of the train

    public string DriverName { get; set; } // Name of the train driver

    public int Contact { get; set; } // Contact number of the train

    public int NoOfSeats { get; set; } // Number of seats available on the train

    public string StartingStation { get; set; } // Starting station of the train's route

    public string EndingStation { get; set; } // Ending station of the train's route

    public List<TrainSchedule> Schedules { get; set; } // List of schedules for the train
}