using backend_server.Models.Types;

namespace backend_server.Models.DomainModels;

public sealed class User : BaseEntity
{
    public string Nic { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public int Mobile { get; set; }

    public string PasswordHash { get; set; }

    public UserRoles Role { get; set; }
}
