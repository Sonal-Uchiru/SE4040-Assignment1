using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using MongoDB.Driver;

namespace backend_server.Queries;

// BaseQuery class for common query operations related to entities of type T.
public class BaseQuery<T> : IBaseQuery<T> where T : BaseEntity
{
    // The database context for entities of type T.
    public static IMongoCollection<T> _dbContext;

    // Retrieves an entity by its unique ID from the database.
    public Task<T> GetEntityByIdAsync(Guid id)
    {
        var filter = Builders<T>.Filter.Eq(i => i.Id, id);
        return _dbContext.Find(filter).SingleOrDefaultAsync();
    }

    // Retrieves a list of entities of type T from the database.
    public Task<List<T>> GetEntitiesAsync()
    {
        var filter = Builders<T>.Filter.Empty;
        return _dbContext.Find(filter).ToListAsync();
    }
}