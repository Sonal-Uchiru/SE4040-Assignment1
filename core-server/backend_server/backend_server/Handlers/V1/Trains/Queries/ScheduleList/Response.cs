using backend_server.Models.Commons.Responses;
using backend_server.Models.Dtos.Trains;

namespace backend_server.Handlers.V1.Trains.Queries.ScheduleList;

// Represents a response object containing a list of 'ScheduleListResponseDto' items.
public class Response : BaseResponse
{
    public required List<ScheduleListResponseDto> Items { get; init; } // List of 'ScheduleListResponseDto' items in the response
}