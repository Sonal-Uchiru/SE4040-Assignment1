using backend_server.Models.Types;

namespace backend_server.Models.Dtos.Authentications;

public sealed class PayloadDto
{
    public required Guid UserId { get; init; }

    public required UserRoles Role { get; set; }

}

