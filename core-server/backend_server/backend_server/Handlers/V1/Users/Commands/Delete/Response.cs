using backend_server.Models.Commons.Responses;

namespace backend_server.Handlers.V1.Users.Commands.Delete;

// Response class containing the ID property to provide feedback after an operation.
public class Response : BaseResponse
{
    public required Guid Id { get; init; }
}