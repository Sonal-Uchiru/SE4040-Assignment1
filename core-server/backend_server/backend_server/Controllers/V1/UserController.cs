using backend_server.Services.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using User = backend_server.Handlers.V1.Users;

namespace backend_server.Controllers.V1;

[ApiController]
[Route("api/v1/[controller]s")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IAuthenticationService _authenticationService;

    public UserController(IMediator mediator, IAuthenticationService authenticationService)
    {
        _mediator = mediator;
        _authenticationService = authenticationService;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(User.Commands.Create.Response))]
    public Task<User.Commands.Create.Response> CreateUser([FromBody] User.Commands.Create.Command command)
    {
        return _mediator.Send(command);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User.Commands.Update.Response))]
    public Task<User.Commands.Update.Response> UpdateUser([FromRoute] Guid id, [FromBody] User.Commands.Update.Command command)
    {
        command.Id = id;
        return _mediator.Send(command);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent, Type = typeof(User.Commands.Delete.Response))]
    public Task<User.Commands.Delete.Response> DeleteUser([FromRoute] Guid id)
    {
        return _mediator.Send(new User.Commands.Delete.Command { Id = id });
    }

    [HttpPatch("{id:guid}/toggleActivation")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User.Commands.ToggleActivation.Response))]
    public Task<User.Commands.ToggleActivation.Response> ToggleActivateUser([FromRoute] Guid id)
    {
        return _mediator.Send(new User.Commands.ToggleActivation.Command { Id = id });
    }

    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User.Queries.Lists.Response))]
    public Task<User.Queries.Lists.Response> GetUserList()
    {
        return _mediator.Send(new User.Queries.Lists.Query());
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User.Queries.Individuals.Response))]
    public Task<User.Queries.Individuals.Response> GetUser([FromRoute] Guid id)
    {

        return _mediator.Send(new User.Queries.Individuals.Query { Id = id });
    }

    [HttpGet("reservations/list")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User.Queries.ReservationLists.Response))]
    public Task<User.Queries.ReservationLists.Response> GetUserReservationList()
    {
        var payload = _authenticationService.GetUserPayloadByContext(HttpContext);

        return _mediator.Send(new User.Queries.ReservationLists.Query
        {
            UserId = payload.UserId
        });
    }
}

