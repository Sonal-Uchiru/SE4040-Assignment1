using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace backend_server.Handlers.V1.Trains.Queries.ScheduleList;

public class Query : IRequest<Response>
{
    [BindNever]
    public Guid Id { get; set; }
}