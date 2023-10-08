using backend_server.Models.DomainModels;

namespace backend_server.Queries.Interfaces;

public interface IReservationQuery : IBaseQuery<Reservation>
{
    Task<List<Reservation>> GetUserEntities(Guid id);
}

