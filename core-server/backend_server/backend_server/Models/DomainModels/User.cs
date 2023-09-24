using MongoDB.Bson.Serialization.Attributes;

namespace backend_server.Models.DomainModels;

public class User
{
    [BsonId]
    public required Guid Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}
