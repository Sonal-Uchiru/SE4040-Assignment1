namespace backend_server.Models.Commons.Responses;

public sealed class UnAuthorizedResponse : ErrorResponse
{
	public UnAuthorizedResponse(string message = "Unauthorized request")
	{
		Meessage = message;
	}
}

