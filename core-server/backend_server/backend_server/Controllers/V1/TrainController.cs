using backend_server.Controllers.V1.Common;
using backend_server.Models.Commons.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Train = backend_server.Handlers.V1.Trains;

namespace backend_server.Controllers.V1;

[ApiController]
[Route("api/v1/[controller]s")]
public class TrainController : ApiBaseController
{
    private readonly IMediator _mediator;

    public TrainController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Train.Commands.Create.Response))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
    public Task<Train.Commands.Create.Response> CreateTrain([FromBody] Train.Commands.Create.Command command)
    {
        return _mediator.Send(command);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Train.Commands.Update.Response))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(NotFoundResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
    public Task<Train.Commands.Update.Response> UpdateTrain([FromRoute] Guid id, [FromBody] Train.Commands.Update.Command command)
    {
        command.Id = id;
        return _mediator.Send(command);
    }


    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent, Type = typeof(Train.Commands.Delete.Response))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(NotFoundResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
    public Task<Train.Commands.Delete.Response> DeleteTrain([FromRoute] Guid id)
    {
        return _mediator.Send(new Train.Commands.Delete.Command { Id = id });
    }

    // Cancel Train
    [HttpPatch("{id:guid}/toggleActivation")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Train.Commands.ToggleActivation.Response))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(NotFoundResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
    public Task<Train.Commands.ToggleActivation.Response> ToggleActivateTrain([FromRoute] Guid id)
    {

        return _mediator.Send(new Train.Commands.ToggleActivation.Command { Id = id });
    }

    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Train.Queries.Lists.Response))]
    public Task<Train.Queries.Lists.Response> GetTrainList()
    {
        return _mediator.Send(new Train.Queries.Lists.Query());
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Train.Queries.Individuals.Response))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(NotFoundResponse))]
    public Task<Train.Queries.Individuals.Response> GetTrain([FromRoute] Guid id)
    {
        return _mediator.Send(new Train.Queries.Individuals.Query { Id = id });
    }

    [HttpGet("{id:guid}/schedules/list")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Train.Queries.TrainScheduleList.Response))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(NotFoundResponse))]
    public Task<Train.Queries.TrainScheduleList.Response> GetTrainScheduleList([FromRoute] Guid id)
    {
        return _mediator.Send(new Train.Queries.TrainScheduleList.Query { Id = id });
    }

    [HttpGet("schedules/list")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Train.Queries.ScheduleList.Response))]
    public Task<Train.Queries.ScheduleList.Response> GetScheduleList()
    {
        return _mediator.Send(new Train.Queries.ScheduleList.Query());
    }
}

