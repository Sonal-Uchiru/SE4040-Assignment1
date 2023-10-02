using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Users;

namespace backend_server.Repositories.Interfaces;

public interface IUserRepository
{

    Task Add(User entity);

    Task Replace(User entity);

    Task Update(Guid id, UpdateUserDto userDto);

    Task ToggleActivation(Guid id, bool activation);

    Task Delete(Guid id);
}

