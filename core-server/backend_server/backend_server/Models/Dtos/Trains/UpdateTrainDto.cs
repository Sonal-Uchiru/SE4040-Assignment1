using backend_server.Models.DomainModels;

namespace backend_server.Models.Dtos.Trains;

public class UpdateTrainDto
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string Model { get; set; }

    public string DriverName { get; set; }

    public int Contact { get; set; }

    public int NoOfSeats { get; set; }

    public string StartingStation { get; set; }

    public string EndingStation { get; set; }

    public bool IsEnabled { get; set; }

    public List<TrainSchedule> Schedules { get; set; }
}

