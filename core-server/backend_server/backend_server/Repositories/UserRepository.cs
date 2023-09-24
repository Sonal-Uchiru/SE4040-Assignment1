using backend_server.Models.DomainModels;
using MongoDB.Driver;

namespace backend_server.Repositories;

public class UserRepository
{
    private readonly IMongoCollection<User> _dbContext;

    public UserRepository()
    {
        _dbContext = DataBaseConnection.database.GetCollection<User>("users");
    }

    public Task Add(User entity) => _dbContext.InsertOneAsync(entity);

    public Task Update(User entity) => _dbContext.ReplaceOneAsync(Builders<User>.Filter.Eq(i => i.Id, entity.Id), entity);

    public Task UpdateFirstName(Guid id, string firstName)
    {
        var filter = Builders<User>.Filter.Eq(i => i.Id, id);
        var update = Builders<User>.Update.Set(i => i.FirstName, firstName);

        return _dbContext.UpdateOneAsync(filter, update);
    }

    public Task Delete(Guid id) => _dbContext.DeleteOneAsync(Builders<User>.Filter.Eq(i => i.Id, id));
}


