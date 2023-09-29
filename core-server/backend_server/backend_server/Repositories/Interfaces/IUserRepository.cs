using backend_server.Models.DomainModels;

namespace backend_server.Repositories.Interfaces;

public interface IUserRepository
{

    Task Add(User entity);

    Task Update(User entity);

    Task UpdateFirstName(Guid id, string firstName);

    Task Delete(Guid id);
}

