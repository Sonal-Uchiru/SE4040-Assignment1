using backend_server.Models.Commons.Responses;

namespace backend_server.Handlers.V1.Users.Commands.Create;

// Represents a response object for a user creation operation.
public class Response : BaseResponse
{
    public required Guid Id { get; init; } // Unique identifier of the created user
}