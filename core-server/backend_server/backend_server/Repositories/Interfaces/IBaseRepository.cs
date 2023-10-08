namespace backend_server.Repositories.Interfaces;

public interface IBaseRepository<T>
{
    Task AddAsync(T entity);

    Task ToggleActivationAsync(Guid id, bool activation);

    Task ReplaceAsync(T entity);

    Task DeleteAsync(Guid id);
}