using backend_server.Models.Commons.Responses;
using backend_server.Models.DomainModels;

namespace backend_server.Handlers.V1.Trains.Queries.TrainScheduleList;

public class Response : BaseResponse
{
	public required List<TrainSchedule> Items { get; init; }
}