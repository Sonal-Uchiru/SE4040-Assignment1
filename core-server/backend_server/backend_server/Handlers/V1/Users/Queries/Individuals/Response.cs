using backend_server.Models.Commons.Responses;
using backend_server.Models.Dtos.Users;

namespace backend_server.Handlers.V1.Users.Queries.Individuals;

public class Response : BaseResponse
{
	public required UserResponseDto Item { get; init; }
}