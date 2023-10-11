using backend_server.Models.Dtos.Users;

namespace backend_server.Handlers.V1.Users.Commands.Update;

// AutoMapper profile for mapping user update commands to DTOs.
public class MapperProfile : BaseMapperProfile
{
    public MapperProfile()
    {
        // Map the Command to the UpdateUserDto for user updates.
        CreateMap<Command, UpdateUserDto>();
    }
}