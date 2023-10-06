namespace backend_server.Models.Commons.Exceptions;

public class NotFoundException : BaseException
{
    public NotFoundException(Guid id, string modelName)
    {
        Id = id;
        ObjectName = modelName;
    }
}