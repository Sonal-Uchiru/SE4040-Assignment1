using backend_server.Controllers.V1.Common;
using backend_server.Models.Commons.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Authentication = backend_server.Handlers.V1.Authentications.Commands.Logins;

namespace backend_server.Controllers.V1;

[ApiController]
[Route("api/v1/[controller]s")]
public class AuthenticationController : ApiBaseController
{
    private readonly IMediator _mediator;

    public AuthenticationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Authentication.Response))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(UnAuthorizedResponse))]
    public Task<Authentication.Response> Authenticate([FromBody] Authentication.Command command)
    {
        return _mediator.Send(command);
    }
}

