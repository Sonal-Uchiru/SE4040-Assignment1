using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace backend_server.Handlers.V1.Trains.Queries.Individuals;

// Represents a query to retrieve information about a 'Train' entity by its unique identifier.
public class Query : IRequest<Response>
{
    [BindNever]
    public Guid Id { get; set; } // The unique identifier of the 'Train' entity
}