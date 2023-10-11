namespace backend_server.Models.Commons.Responses;

public class BaseResponse
{
	public DateTime Time { get; init; }

	public BaseResponse()
	{
        Time = DateTime.Now;
	}
}

