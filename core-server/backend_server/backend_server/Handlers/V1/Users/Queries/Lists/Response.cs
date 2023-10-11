using backend_server.Models.Commons.Responses;
using backend_server.Models.Dtos.Users;

namespace backend_server.Handlers.V1.Users.Queries.Lists;

public class Response : BaseResponse
{
    // Define a list of UserResponseDto items as part of the response.
    public required List<UserResponseDto> Items { get; init; }
}