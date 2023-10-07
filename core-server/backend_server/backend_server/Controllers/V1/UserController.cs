using backend_server.Controllers.V1.Common;
using backend_server.Models.Commons.Responses;
using backend_server.Services.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using User = backend_server.Handlers.V1.Users;

namespace backend_server.Controllers.V1;

[ApiController]
[Route("api/v1/[controller]s")]
public class UserController : ApiBaseController
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
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
    public Task<User.Commands.Create.Response> CreateUser([FromBody] User.Commands.Create.Command command)
    {
        return _mediator.Send(command);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User.Commands.Update.Response))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(NotFoundResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
    public Task<User.Commands.Update.Response> UpdateUser([FromRoute] Guid id, [FromBody] User.Commands.Update.Command command)
    {
        command.Id = id;
        return _mediator.Send(command);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent, Type = typeof(User.Commands.Delete.Response))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(NotFoundResponse))]
    public Task<User.Commands.Delete.Response> DeleteUser([FromRoute] Guid id)
    {
        return _mediator.Send(new User.Commands.Delete.Command { Id = id });
    }

    [HttpPatch("{id:guid}/toggleActivation")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User.Commands.ToggleActivation.Response))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(NotFoundResponse))]
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
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(NotFoundResponse))]
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

