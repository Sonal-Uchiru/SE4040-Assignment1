using MongoDB.Driver;

namespace backend_server;

public class DataBaseConnection
{
    private static readonly MongoClient dbClient = new("mongodb+srv://it20190484:1234@bookingpassage.sfxygm2.mongodb.net/?retryWrites=true&w=majority");

    //private static readonly MongoClientSettings settings = new()
    //{
    //    Server = new MongoServerAddress("localhost", 27017)
    //};

    //private static readonly MongoClient dbClient = new(settings);

    public static readonly IMongoDatabase database = dbClient.GetDatabase("BookingPassage");
}

