namespace backend_server.Models.Commons.Exceptions;

public sealed class ValidationException : BaseException
{
	public ValidationException(string errorReason = "Not a valid request")
	{
		ErrorReason = errorReason;
	}
}
