using Microsoft.AspNetCore.Mvc;

namespace backend_server.Models.Commons.Responses;

public class BaseResponse : IActionResult
{
	public BaseResponse()
	{
	}

    public Task ExecuteResultAsync(ActionContext context)
    {
        throw new NotImplementedException();
    }
}

