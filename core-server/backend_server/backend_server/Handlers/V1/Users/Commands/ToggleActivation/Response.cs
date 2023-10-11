using backend_server.Models.Commons.Responses;

namespace backend_server.Handlers.V1.Users.Commands.ToggleActivation;

// Response class for providing a unique identifier (ID) in the response.
public class Response : BaseResponse
{
    public required Guid Id { get; init; }
}