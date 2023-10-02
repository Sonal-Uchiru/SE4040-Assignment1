using backend_server.Models.DomainModels;

namespace backend_server.Queries.Interfaces;

public interface IReservationQuery
{
    Task<Reservation> GetEntityById(Guid id);

    Task<List<Reservation>> GetEntities();

    Task<List<Reservation>> GetUserEntities(Guid id);
}

