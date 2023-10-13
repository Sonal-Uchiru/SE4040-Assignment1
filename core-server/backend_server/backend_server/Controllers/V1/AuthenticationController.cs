using backend_server.Controllers.V1.Common;
using backend_server.Models.Commons.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Authentication = backend_server.Handlers.V1.Authentications.Commands.Logins;

namespace backend_server.Controllers.V1;

// This controller handles authentication-related API endpoints for version 1 of the API.
// It uses the Mediator pattern to process authentication commands and can return
// various response types such as 201 Created, 400 Bad Request, and 401 Unauthorized.
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