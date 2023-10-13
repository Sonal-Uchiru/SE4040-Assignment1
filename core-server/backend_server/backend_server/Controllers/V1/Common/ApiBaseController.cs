using backend_server.Models.Commons.Responses;
using Microsoft.AspNetCore.Mvc;

namespace backend_server.Controllers.V1.Common;

// This is a base controller for API endpoints, providing common functionality
//and error response handling. It specifies that it can return a 500 Internal Server Error
// response with an ErrorResponse model in case of unexpected errors.
[ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
public class ApiBaseController : ControllerBase { }