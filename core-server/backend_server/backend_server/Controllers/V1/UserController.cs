using MediatR;
using Microsoft.AspNetCore.Mvc;
using User = backend_server.Handlers.V1.Users;


namespace backend_server.Controllers.V1;

[ApiController]
[Route("api/v1/[controller]s")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(User.Commands.Create.Response))]
    public Task<User.Commands.Create.Response> CreateUser([FromBody] User.Commands.Create.Command command)
    {
        return _mediator.Send(command);
    }

    [HttpPut("{id:guid}")]
    public Task UpdateUser([FromRoute] Guid id)
    {
        return Task.CompletedTask;
    }


    [HttpDelete("{id:guid}")]
    public Task DeleteUser([FromRoute] Guid id)
    {
        return Task.CompletedTask;
    }

    [HttpPatch("{id:guid}/toggleActivation")]
    public Task ToggleActivateUser([FromRoute] Guid id)
    {
        return Task.CompletedTask;
    }

    [HttpGet("list")]
    public Task GetUserList()
    {
        return Task.CompletedTask;
    }

    [HttpGet("{id:guid}")]
    public Task GetUser([FromRoute] Guid id)
    {
        return Task.CompletedTask;
    }

    [HttpGet("reservations/list")]
    public Task GetUserReservationList()
    {
        return Task.CompletedTask;
    }
}

