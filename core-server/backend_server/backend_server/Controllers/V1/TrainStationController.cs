using backend_server.Models.DomainModels;
using Microsoft.AspNetCore.Mvc;

namespace backend_server.Controllers.V1;

[ApiController]
[Route("api/v1/[controller]s")]
public class TrainStationController : ControllerBase
{
    [HttpGet("list")]
    public Task GetTrainStationList()
    {
        return (Task<User>)Task.CompletedTask;
    }
}

