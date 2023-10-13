namespace backend_server.Models.Commons.Exceptions;

public sealed class UnauthorizedException : BaseException
{
	public UnauthorizedException(string errorResason)
	{
		ErrorReason = errorResason;
	}
}