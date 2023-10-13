using MongoDB.Bson.Serialization.Attributes;

namespace backend_server.Models.DomainModels;

public class BaseEntity
{
    [BsonId]
    public Guid Id { get; set; }

    public bool IsEnabled { get; set; } = true;

    public DateTime Created { get; set; }

    public DateTime Modified { get; set; }
}