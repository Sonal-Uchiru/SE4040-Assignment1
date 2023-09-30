using backend_server.Models.DomainModels;

namespace backend_server.Queries.Interfaces;

public interface ITrainQuery
{
    Task<Train> GetEntityById(Guid id);

    Task<List<Train>> GetEntities();
}

