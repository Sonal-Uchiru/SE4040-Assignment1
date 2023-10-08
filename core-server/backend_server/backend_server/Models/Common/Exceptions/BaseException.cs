namespace backend_server.Models.Commons.Exceptions;

public class BaseException : Exception
{
	public Guid Id { get; set; }

	public string ObjectName { get; set; }

	public string ErrorReason { get; set; }
}