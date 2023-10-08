using backend_server.Models.Commons.Responses;
using Microsoft.AspNetCore.Mvc;

namespace backend_server.Controllers.V1.Common;

[ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
public class ApiBaseController : ControllerBase { }


