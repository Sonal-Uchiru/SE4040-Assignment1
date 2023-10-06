namespace backend_server.Models.Commons.Responses;

public class UnAuthorizedResponse : ErrorResponse
{
	public UnAuthorizedResponse(string message = "Unauthorized request")
	{
		Meessage = message;
	}
}

