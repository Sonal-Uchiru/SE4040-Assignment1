using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Users;

namespace backend_server.Repositories.Interfaces;

public interface IUserRepository : IBaseRepository<User>
{
    Task UpdateAsync(Guid id, UpdateUserDto userDto);
}

