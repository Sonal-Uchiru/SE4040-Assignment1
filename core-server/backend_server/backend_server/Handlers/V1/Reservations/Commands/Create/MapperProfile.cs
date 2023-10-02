using backend_server.Models.DomainModels;

namespace backend_server.Handlers.V1.Reservations.Commands.Create;

public class MapperProfile : BaseMapperProfile
{
    public MapperProfile()
    {
        CreateMap<Command, Reservation>();
    }
}

