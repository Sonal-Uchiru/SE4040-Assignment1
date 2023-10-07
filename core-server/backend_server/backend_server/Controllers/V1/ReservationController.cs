using backend_server.Models.Commons.Responses;
using backend_server.Models.DomainModels;
using backend_server.Services.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Reservations = backend_server.Handlers.V1.Reservations;
namespace backend_server.Controllers.V1;

[ApiController]
[Route("api/v1/[controller]s")]
public class ReservationController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IAuthenticationService _authenticationService;

    public ReservationController(IMediator mediator, IAuthenticationService authenticationService)
    {
        _mediator = mediator;
        _authenticationService = authenticationService;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Reservations.Commands.Create.Response))]
    public Task<Reservations.Commands.Create.Response> CreateReservation([FromBody] Reservations.Commands.Create.Command command)
    {
        var payload = _authenticationService.GetUserPayloadByContext(HttpContext);
        command.UserId = payload.UserId;

        return _mediator.Send(command);
    }

    [HttpPatch("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Reservations.Commands.Update.Response))]
    public Task<Reservations.Commands.Update.Response> UpdateReservation([FromRoute] Guid id, [FromBody] Reservations.Commands.Update.Command command)
    {
        command.Id = id;
        return _mediator.Send(command);
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Reservations.Commands.Delete.Response))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(NotFoundResponse))]
    public Task<Reservations.Commands.Delete.Response> DeleteReservation([FromRoute] Guid id)
    {
        return _mediator.Send(new Reservations.Commands.Delete.Command { Id = id });
    }

    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Reservations.Queries.Lists.Response))]
    public Task<Reservations.Queries.Lists.Response> GetReservationList()
    {
        return _mediator.Send(new Reservations.Queries.Lists.Query());
    }
}

