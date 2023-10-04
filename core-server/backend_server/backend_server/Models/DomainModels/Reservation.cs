using MongoDB.Bson.Serialization.Attributes;

namespace backend_server.Models.DomainModels;

public class Reservation
{
    [BsonId]
    public Guid Id { get; set; }

    public string TrainName { get; set; }

    public string StartingStation { get; set; }

    public string EndingStation { get; set; }

    public string DepartureDate { get; set; }

    public string ArrivalTime { get; set; }

    public string DepartureTime { get; set; }

    public int NoOfPassengers { get; set; }

    public double PerPersonPrice { get; set; }

    public bool IsEnabled { get; set; } = true;

    public Guid UserId { get; set; }
}