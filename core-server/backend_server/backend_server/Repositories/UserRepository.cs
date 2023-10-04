using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Users;
using backend_server.Repositories.Interfaces;
using MongoDB.Driver;

namespace backend_server.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IMongoCollection<User> _dbContext;

    public UserRepository()
    {
        _dbContext = DataBaseConnection.database.GetCollection<User>("users");
    }

    public Task Add(User entity) => _dbContext.InsertOneAsync(entity);

    public Task Replace(User entity) => _dbContext.ReplaceOneAsync(Builders<User>.Filter.Eq(i => i.Id, entity.Id), entity);

    public Task Update(Guid id, UpdateUserDto userDto)
    {
        var filter = Builders<User>.Filter.Eq(i => i.Id, id);
        var update = Builders<User>.Update
            .Set(i => i.FirstName, userDto.FirstName)
            .Set(i => i.LastName, userDto.LastName)
            .Set(i => i.Mobile, userDto.Mobile);

        return _dbContext.UpdateOneAsync(filter, update);
    }

    public Task ToggleActivation(Guid id, bool activation)
    {
        var filter = Builders<User>.Filter.Eq(i => i.Id, id);
        var update = Builders<User>.Update.Set(i => i.IsEnabled, activation);

        return _dbContext.UpdateOneAsync(filter, update);
    }

    public Task Delete(Guid id) => _dbContext.DeleteOneAsync(Builders<User>.Filter.Eq(i => i.Id, id));
}


