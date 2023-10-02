using MongoDB.Driver;

namespace backend_server;

public class DataBaseConnection
{
    private static readonly MongoClient dbClient = new("mongodb+srv://cia:Chamodh1234@mean-test.msddy.mongodb.net/?retryWrites=true&w=majority");

    public static readonly IMongoDatabase database = dbClient.GetDatabase("BookingPassage");
}

