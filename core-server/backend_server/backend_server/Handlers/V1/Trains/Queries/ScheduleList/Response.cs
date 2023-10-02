using backend_server.Models.Commons.Responses;
using backend_server.Models.Dtos.Trains;

namespace backend_server.Handlers.V1.Trains.Queries.ScheduleList;

public class Response : BaseResponse
{
	public required List<ScheduleListResponseDto> Items { get; init; }
}