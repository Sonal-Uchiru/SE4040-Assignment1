namespace backend_server.Queries.Interfaces;

public interface IBaseQuery<T>
{
    Task<T> GetEntityById(Guid id);

    Task<List<T>> GetEntities();
}

