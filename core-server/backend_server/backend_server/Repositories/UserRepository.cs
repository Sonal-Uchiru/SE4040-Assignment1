using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Users;
using backend_server.Repositories.Interfaces;
using MongoDB.Driver;

namespace backend_server.Repositories;

public sealed class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository()
    {
        _dbContext = DataBaseConnection.database.GetCollection<User>("users");
    }

    public Task UpdateAsync(Guid id, UpdateUserDto userDto)
    {
        var filter = Builders<User>.Filter.Eq(i => i.Id, id);
        var update = Builders<User>.Update
            .Set(i => i.FirstName, userDto.FirstName)
            .Set(i => i.LastName, userDto.LastName)
            .Set(i => i.Mobile, userDto.Mobile)
            .Set(i => i.Modified, DateTime.Now);

        return _dbContext.UpdateOneAsync(filter, update);
    }
}