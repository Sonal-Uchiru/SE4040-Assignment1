using backend_server.Models.DomainModels;
using backend_server.Repositories.Interfaces;
using MongoDB.Driver;

namespace backend_server.Repositories;

// BaseRepository class for common MongoDB repository operations.
// T represents the entity type that this repository works with.
public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
{
    // Static field to store the database context.
    public static IMongoCollection<T> _dbContext;

    // Adds an entity to the database.
    public Task AddAsync(T entity)
    {
        entity.Created = DateTime.Now;
        entity.Modified = DateTime.Now;

        return _dbContext.InsertOneAsync(entity);
    }

    // Deletes an entity from the database based on its unique identifier.
    public Task DeleteAsync(Guid id) => _dbContext.DeleteOneAsync(Builders<T>.Filter.Eq(i => i.Id, id));

    // Replaces an existing entity with a new one based on its unique identifier.
    public Task ReplaceAsync(T entity)
    {
        entity.Modified = DateTime.Now;

        return _dbContext.ReplaceOneAsync(Builders<T>.Filter.Eq(i => i.Id, entity.Id), entity);
    }

    // Toggles the activation status of an entity based on its unique identifier.
    public Task ToggleActivationAsync(Guid id, bool activation)
    {
        var filter = Builders<T>.Filter.Eq(i => i.Id, id);
        var update = Builders<T>.Update
            .Set(i => i.IsEnabled, activation)
            .Set(i => i.Modified, DateTime.Now);

        return _dbContext.UpdateOneAsync(filter, update);
    }
}