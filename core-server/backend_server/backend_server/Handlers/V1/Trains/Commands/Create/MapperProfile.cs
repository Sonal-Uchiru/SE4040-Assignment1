using backend_server.Models.DomainModels;

namespace backend_server.Handlers.V1.Trains.Commands.Create;

public class MapperProfile : BaseMapperProfile
{
    public MapperProfile()
    {
        CreateMap<Command, Train>();
    }
}

