using backend_server.Models.DomainModels;
using Microsoft.AspNetCore.Mvc;

namespace backend_server.Controllers.V1;

[ApiController]
[Route("api/v1/[controller]s")]
public class ReservationController : ControllerBase
{
    [HttpPost]
    public Task CreateReservation()
    {
        return (Task<User>)Task.CompletedTask;
    }

    [HttpPatch("{id:guid}")]
    public Task UpdateReservation([FromRoute] Guid id)
    {
        return (Task<User>)Task.CompletedTask;
    }

    [HttpDelete("{id:guid}")]
    public Task DeleteReservation([FromRoute] Guid id)
    {
        return (Task<User>)Task.CompletedTask;
    }

    [HttpGet("list")]
    public Task GetReservationList()
    {
        return (Task<User>)Task.CompletedTask;
    }
}

