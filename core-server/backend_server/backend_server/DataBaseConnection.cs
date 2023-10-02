using MongoDB.Driver;

namespace backend_server;

public class DataBaseConnection
{
    private static readonly MongoClientSettings settings = new()
    {
        Server = new MongoServerAddress("localhost", 27017)
    };

    private static readonly MongoClient dbClient = new(settings);

    public static readonly IMongoDatabase database = dbClient.GetDatabase("BookingPassage");
}

