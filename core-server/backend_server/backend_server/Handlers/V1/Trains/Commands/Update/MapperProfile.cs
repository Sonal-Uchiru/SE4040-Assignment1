using backend_server.Models.DomainModels;

namespace backend_server.Handlers.V1.Trains.Commands.Update;

// AutoMapper profile for mapping 'Command' objects to 'Train' entities.
public class MapperProfile : BaseMapperProfile
{
    public MapperProfile()
    {
        CreateMap<Command, Train>();
    }
}