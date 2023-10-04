using backend_server.Models.Commons.Responses;

namespace backend_server.Handlers.V1.Authentications.Logins;

public class Response : BaseResponse
{
	public required string Token { get; init; }
}