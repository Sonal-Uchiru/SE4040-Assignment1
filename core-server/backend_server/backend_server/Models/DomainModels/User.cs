using backend_server.Models.Types;
using MongoDB.Bson.Serialization.Attributes;

namespace backend_server.Models.DomainModels;

public class User
{
    [BsonId]
    public Guid Id { get; set; }

    public string Nic { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public int Mobile { get; set; }

    public string PasswordHash { get; set; }

    public UserRoles Role { get; set; }
}
