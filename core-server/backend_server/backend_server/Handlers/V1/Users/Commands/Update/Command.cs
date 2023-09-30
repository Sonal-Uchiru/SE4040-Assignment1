using System.Text.Json.Serialization;
using MediatR;

namespace backend_server.Handlers.V1.Users.Commands.Update;

public class Command : IRequest<Response>
{
    [JsonIgnore]
    public Guid Id { get; set; }

    public string FirstName { get; init; }

    public string LastName { get; init; }

    public int Mobile { get; init; }
}