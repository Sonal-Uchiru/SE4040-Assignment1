using backend_server.Models.DomainModels;
using MediatR;

namespace backend_server.Handlers.V1.Trains.Commands.Create;

// Represents a command for a specific operation related to trains, such as creation or update.
public class Command : IRequest<Response>
{
    public string Name { get; set; } // Name of the train

    public string Model { get; set; } // Model of the train

    public string DriverName { get; set; } // Name of the train driver

    public int Contact { get; set; } // Contact information for the train

    public int NoOfSeats { get; set; } // Number of seats in the train

    public string StartingStation { get; set; } // Starting station of the train

    public string EndingStation { get; set; } // Ending station of the train

    public List<TrainSchedule> Schedules { get; set; } // List of schedules for the train
}