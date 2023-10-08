using backend_server.Models.Dtos.Trains;
using backend_server.Queries.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Trains.Queries.ScheduleList;

public class Handler : IRequestHandler<Query, Response>
{
    private readonly ITrainQuery _trainQuery;
    

    public Handler(ITrainQuery trainQuery)
    {
        _trainQuery = trainQuery;
    }

    public async Task<Response> Handle(Query command, CancellationToken cancellationToken)
    {
        var trains = await _trainQuery.GetEntitiesAsync();

        var scheduleListResponse = new List<ScheduleListResponseDto>();

        foreach(var train in trains)
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
                IsEnabled = train.IsEnabled
            };

            foreach (var schedule in train.Schedules)
            {
                var scheduleWithTrain = tempTrainDetails;
                scheduleWithTrain.Frequency = schedule.Frequency;
                scheduleWithTrain.ArrivalTime = schedule.ArrivalTime;
                scheduleWithTrain.DepartureTime = schedule.DepartureTime;
                scheduleWithTrain.IsReturnTrip = schedule.IsReturnTrip;
                scheduleWithTrain.Price = schedule.Price;

                scheduleListResponse.Add(scheduleWithTrain);
            }
        }

        return new Response
        {
            Items = scheduleListResponse
        };
    }
}