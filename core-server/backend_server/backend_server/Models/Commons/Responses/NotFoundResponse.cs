namespace backend_server.Models.Commons.Responses;

public class NotFoundResponse :ErrorResponse
{
	public NotFoundResponse(Guid id, string modelName)
	{
		Meessage = $"{modelName} id {id} is not found!";
	}
}