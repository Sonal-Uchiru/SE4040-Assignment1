using MediatR;
using Microsoft.AspNetCore.Mvc;
using Authentication = backend_server.Handlers.V1.Authentications.Logins;

namespace backend_server.Controllers.V1;

[ApiController]
[Route("api/v1/[controller]s")]
public class AuthenticationController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthenticationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Authentication.Response))]
    public Task<Authentication.Response> Authenticate([FromBody] Authentication.Command command)
    {
        return _mediator.Send(command);
    }
}

