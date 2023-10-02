using backend_server.Models.DomainModels;
using MediatR;

namespace backend_server.Handlers.V1.Trains.Commands.Create;

public class Command : IRequest<Response>
{
    public string Name { get; set; }

    public string Model { get; set; }

    public string DriverName { get; set; }

    public int Contact { get; set; }

    public int NoOfSeats { get; set; }

    public string StartingStation { get; set; }

    public string EndingStation { get; set; }

    public List<TrainSchedule> Schedules { get; set; }
}