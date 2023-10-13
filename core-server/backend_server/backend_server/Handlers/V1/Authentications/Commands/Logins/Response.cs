using backend_server.Models.Commons.Responses;

namespace backend_server.Handlers.V1.Authentications.Commands.Logins;

// Represents a response object that is typically returned as a result of a successful operation.
// It contains essential information such as the user's 'UserId' and an authentication 'Token'.
public class Response : BaseResponse
{
    public required Guid UserId { get; init; }  // User's unique identifier

    public required string Token { get; init; }  // Authentication token for the user
}