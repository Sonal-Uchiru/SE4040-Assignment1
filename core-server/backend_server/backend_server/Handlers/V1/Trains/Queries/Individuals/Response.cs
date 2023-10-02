using backend_server.Models.Commons.Responses;
using backend_server.Models.DomainModels;

namespace backend_server.Handlers.V1.Trains.Queries.Individuals;

public class Response : BaseResponse
{
	public required Train Item { get; init; }
}