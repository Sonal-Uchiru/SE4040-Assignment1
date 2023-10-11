using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace backend_server.Handlers.V1.Trains.Queries.TrainScheduleList;

// Represents a query to retrieve a 'TrainSchedule' by its unique identifier.
public class Query : IRequest<Response>
{
    [BindNever]
    public Guid Id { get; set; } // The unique identifier of the 'TrainSchedule' to be retrieved
}