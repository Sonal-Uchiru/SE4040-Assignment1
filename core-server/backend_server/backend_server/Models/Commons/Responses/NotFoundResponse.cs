namespace backend_server.Models.Commons.Responses;

public sealed class NotFoundResponse : ErrorResponse
{
    public NotFoundResponse(Guid id, string modelName)
    {
        Meessage = $"{modelName} - Id: {id} is not found";
    }
}