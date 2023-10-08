using backend_server.Models.DomainModels;

namespace backend_server.Queries.Interfaces;

public interface IUserQuery : IBaseQuery<User>
{
    Task<User> GetUserByNIC(string nic);
}

