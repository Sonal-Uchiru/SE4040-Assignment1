using backend_server.Models.Commons.Responses;

namespace backend_server.Handlers.V1.Reservations.Commands.Update;

public class Response : BaseResponse
{
	public required Guid Id { get; init; }
}