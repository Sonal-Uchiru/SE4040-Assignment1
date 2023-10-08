namespace backend_server.Queries.Interfaces;

public interface IBaseQuery<T>
{
    Task<T> GetEntityByIdAsync(Guid id);

    Task<List<T>> GetEntitiesAsync();
}