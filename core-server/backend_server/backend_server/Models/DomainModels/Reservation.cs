namespace backend_server.Models.DomainModels;

public sealed class Reservation : BaseEntity
{
    public Guid TrainId { get; set; }

    public string TrainName { get; set; }

    public string StartingStation { get; set; }

    public string EndingStation { get; set; }

    public string DepartureDate { get; set; }

    public string ArrivalTime { get; set; }

    public string DepartureTime { get; set; }

    public int NoOfPassengers { get; set; }

    public double PerPersonPrice { get; set; }

    public DateTime ReservationDate { get; set; }

    public Guid UserId { get; set; }
}