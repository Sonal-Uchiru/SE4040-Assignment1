using backend_server.Models.Types;

namespace backend_server.Models.Dtos.Users;

public class UserResponseDto
{
    public  Guid Id { get; set; }

    public string Nic { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public int Mobile { get; set; }

    public UserRoles Role { get; set; }

    public bool IsEnabled { get; set; }
}

