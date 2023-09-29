using backend_server.Models.DomainModels;
using Microsoft.AspNetCore.Mvc;

namespace backend_server.Controllers.V1;

[ApiController]
[Route("api/v1/[controller]s")]
public class TrainController : ControllerBase
{
    [HttpPost]
    public Task CreateTrain()
    {
        return Task.CompletedTask;
    }

    [HttpPut("{id:guid}")]
    public Task UpdateTrain([FromRoute] Guid id)
    {
        return (Task<User>)Task.CompletedTask;
    }


    [HttpDelete("{id:guid}")]
    public Task DeleteTrain([FromRoute] Guid id)
    {
        return (Task<User>)Task.CompletedTask;
    }

    // Cancel Train
    [HttpPatch("{id:guid}/toggleActivation")]
    public Task ToggleActivateTrain([FromRoute] Guid id)
    {
        return (Task<User>)Task.CompletedTask;
    }

    [HttpGet("list")]
    public Task GetTrainList()
    {
        return (Task<User>)Task.CompletedTask;
    }

    [HttpGet("{id:guid}")]
    public Task GetTrain([FromRoute] Guid id)
    {
        return (Task<User>)Task.CompletedTask;
    }

    [HttpGet("{id:guid}/schedules/list")]
    public Task GetTrainScheduleList([FromRoute] Guid id)
    {
        return (Task<User>)Task.CompletedTask;
    }

    [HttpGet("{id:guid}/schedules/{ids:guid}/availableSeats/list")]
    public Task GetTrainScheduleAvailableSeatList([FromRoute] Guid id, Guid ids)
    {
        return (Task<User>)Task.CompletedTask;
    }
}

