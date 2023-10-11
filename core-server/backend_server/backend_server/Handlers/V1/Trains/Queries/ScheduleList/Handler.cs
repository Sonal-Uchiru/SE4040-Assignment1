using backend_server.Models.Dtos.Trains;
using backend_server.Queries.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Trains.Queries.ScheduleList;

// Handler class for processing and handling queries to retrieve a list of 'Train' schedules.
public class Handler : IRequestHandler<Query, Response>
{
    private readonly ITrainQuery _trainQuery;

    public Handler(ITrainQuery trainQuery)
    {
        _trainQuery = trainQuery;
    }

    public async Task<Response> Handle(Query command, CancellationToken cancellationToken)
    {
        // Retrieve a list of 'Train' entities.
        var trains = await _trainQuery.GetEntitiesAsync();

        var scheduleListResponse = new List<ScheduleListResponseDto>();

        foreach (var train in trains)
        {
            // Create a list of 'ScheduleListResponseDto' items based on train schedules.
            var tempScheduleList = new List<ScheduleListResponseDto>(train.Schedules.Count);

            foreach (var schedule in train.Schedules)
            {
                var tempTrainDetails = new ScheduleListResponseDto
                {
                    Id = train.Id,
                    Name = train.Name,
                    Model = train.Model,
                    DriverName = train.DriverName,
                    Contact = train.Contact,
                    NoOfSeats = train.NoOfSeats,
                    StartingStation = train.StartingStation,
                    EndingStation = train.EndingStation,
                    IsEnabled = train.IsEnabled,
                    Frequency = schedule.Frequency,
                    ArrivalTime = schedule.ArrivalTime,
                    DepartureTime = schedule.DepartureTime,
                    IsReturnTrip = schedule.IsReturnTrip,
                    Price = schedule.Price
                };

                tempScheduleList.Add(tempTrainDetails);
            }

            scheduleListResponse.AddRange(tempScheduleList);
        }

        // Return a response containing the list of 'ScheduleListResponseDto' items.
        return new Response
        {
            Items = scheduleListResponse
        };
    }
}