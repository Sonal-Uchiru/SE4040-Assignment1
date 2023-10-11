using MediatR;

namespace backend_server.Handlers.V1.Reservations.Queries.Lists;

// Represents a query object used to retrieve information, typically resulting in a Response.
public class Query : IRequest<Response> { }