using backend_server.Models.Dtos.Reservations;

namespace backend_server.Handlers.V1.Reservations.Commands.Update;

// Mapper profile for mapping Command objects to UpdateReservationDto objects.
public class MapperProfile : BaseMapperProfile
{
    public MapperProfile()
    {
        CreateMap<Command, UpdateReservationDto>();
    }
}