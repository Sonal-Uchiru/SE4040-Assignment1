namespace backend_server.Models.Dtos.Trains;

public class ScheduleListResponseDto
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

    public string Frequency { get; set; }

    public string ArrivalTime { get; set; }

    public string DepartureTime { get; set; }

    public bool IsReturnTrip { get; set; }

    public double Price { get; set; }
}

