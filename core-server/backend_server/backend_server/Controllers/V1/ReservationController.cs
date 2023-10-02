using MediatR;
using Microsoft.AspNetCore.Mvc;
using Reservation = backend_server.Handlers.V1.Reservations;
namespace backend_server.Controllers.V1;

[ApiController]
[Route("api/v1/[controller]s")]
public class ReservationController : ControllerBase
{
    private readonly IMediator _mediator;

    public ReservationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Reservation.Commands.Create.Response))]
    public Task<Reservation.Commands.Create.Response> CreateReservation([FromBody] Reservation.Commands.Create.Command command)
    {
        return _mediator.Send(command);
    }

    [HttpPatch("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Reservation.Commands.Update.Response))]
    public Task<Reservation.Commands.Update.Response> UpdateReservation([FromRoute] Guid id, [FromBody] Reservation.Commands.Update.Command command)
    {
        command.Id = id;
        return _mediator.Send(command);
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Reservation.Commands.Delete.Response))]
    public Task<Reservation.Commands.Delete.Response> DeleteReservation([FromRoute] Guid id)
    {
        return _mediator.Send(new Reservation.Commands.Delete.Command { Id = id });
    }

    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Reservation.Queries.Lists.Response))]
    public Task<Reservation.Queries.Lists.Response> GetReservationList()
    {
        return _mediator.Send(new Reservation.Queries.Lists.Query());
    }
}

