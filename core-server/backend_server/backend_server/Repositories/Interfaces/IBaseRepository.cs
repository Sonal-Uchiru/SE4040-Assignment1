namespace backend_server.Repositories.Interfaces;

public interface IBaseRepository<T>
{
    Task Add(T entity);

    Task ToggleActivation(Guid id, bool activation);

    Task Replace(T entity);

    Task Delete(Guid id);
}