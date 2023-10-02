using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace backend_server.Handlers.V1.Reservations.Commands.Delete;

public class Command : IRequest<Response>
{
    [BindNever]
    public Guid Id { get; set; }
}