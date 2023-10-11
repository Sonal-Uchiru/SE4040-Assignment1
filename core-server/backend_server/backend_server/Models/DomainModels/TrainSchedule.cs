namespace backend_server.Models.DomainModels;

public sealed class TrainSchedule
{
    public string Frequency { get; set; }

    public string ArrivalTime { get; set; }

    public string DepartureTime { get; set; }

    public bool IsReturnTrip { get; set; }

    public double Price { get; set; }
}

