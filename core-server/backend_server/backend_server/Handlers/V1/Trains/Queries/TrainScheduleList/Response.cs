using backend_server.Models.Commons.Responses;
using backend_server.Models.DomainModels;

namespace backend_server.Handlers.V1.Trains.Queries.TrainScheduleList;

// Represents a response object containing a list of 'TrainSchedule' items.
public class Response : BaseResponse
{
    public required List<TrainSchedule> Items { get; init; } // List of 'TrainSchedule' items in the response
}