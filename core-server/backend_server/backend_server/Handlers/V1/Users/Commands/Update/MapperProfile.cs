using backend_server.Models.Dtos.Users;

namespace backend_server.Handlers.V1.Users.Commands.Update;

public class MapperProfile : BaseMapperProfile
{
    public MapperProfile()
    {
        CreateMap<Command, UpdateUserDto>();
    }
}

