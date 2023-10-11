using backend_server.Models.Commons.Responses;

namespace backend_server.Handlers.V1.Authentications.Commands.Logins;

public class Response : BaseResponse
{
    public required Guid UserId { get; init; }

    public required string Token { get; init; }
}