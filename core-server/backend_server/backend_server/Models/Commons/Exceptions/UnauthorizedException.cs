namespace backend_server.Models.Commons.Exceptions;

public class UnauthorizedException : BaseException
{
	public UnauthorizedException(string errorResason)
	{
		ErrorReason = errorResason;
	}
}