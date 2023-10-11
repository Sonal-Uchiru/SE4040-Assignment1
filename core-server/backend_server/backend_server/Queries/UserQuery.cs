using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using MongoDB.Driver;

namespace backend_server.Queries;

// UserQuery class for specific query operations related to users.
public sealed class UserQuery : BaseQuery<User>, IUserQuery
{
    public UserQuery()
    {
        // Initialize the database context for users.
        _dbContext = DataBaseConnection.database.GetCollection<User>("users");
    }

    // Checks if a user with the specified NIC (National Identification Card) exists.
    public Task<bool> AnyUserByNicAsync(string nic)
    {
        var filter = Builders<User>.Filter.Eq(i => i.Nic, nic);
        return _dbContext.Find(filter).AnyAsync();
    }

    // Retrieves a user by their NIC (National Identification Card).
    public Task<User> GetUserByNICAsync(string nic)
    {
        var filter = Builders<User>.Filter.Eq(i => i.Nic, nic);
        return _dbContext.Find(filter).SingleOrDefaultAsync();
    }
}