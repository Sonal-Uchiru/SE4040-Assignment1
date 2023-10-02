using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using MongoDB.Driver;

namespace backend_server.Queries;

public class UserQuery : IUserQuery
{
    private readonly IMongoCollection<User> _dbContext;

    public UserQuery()
    {
        _dbContext = DataBaseConnection.database.GetCollection<User>("users");
    }

    public Task<User> GetEntityById(Guid id)
    {
        var filter = Builders<User>.Filter.Eq(i => i.Id, id);
        return _dbContext.Find(filter).SingleOrDefaultAsync();
    }

    public Task<List<User>> GetEntities()
    {
        var filter = Builders<User>.Filter.Empty;
        return _dbContext.Find(filter).ToListAsync();
    }

    public Task<User> GetUserByNIC(string nic)
    {
        var filter = Builders<User>.Filter.Eq(i => i.Nic, nic);
        return _dbContext.Find(filter).SingleOrDefaultAsync();
    }
}