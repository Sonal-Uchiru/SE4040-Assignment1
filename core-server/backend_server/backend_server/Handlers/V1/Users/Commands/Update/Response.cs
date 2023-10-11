using backend_server.Models.Commons.Responses;

namespace backend_server.Handlers.V1.Users.Commands.Update;

// Response class for user update operation.
public class Response : BaseResponse
{
    // The ID of the updated user.
    public required Guid Id { get; init; }
}