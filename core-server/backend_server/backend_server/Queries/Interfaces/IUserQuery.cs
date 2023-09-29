using backend_server.Models.DomainModels;

namespace backend_server.Queries.Interfaces;

public interface IUserQuery
{
    Task<User> GetEntityById(Guid id);

    Task<List<User>> GetEntities();

    Task<User> GetUserByNIC(string nic);
}

