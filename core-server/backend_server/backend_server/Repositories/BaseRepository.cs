using backend_server.Models.DomainModels;
using backend_server.Repositories.Interfaces;
using MongoDB.Driver;

namespace backend_server.Repositories;

public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
{
    public static IMongoCollection<T> _dbContext;

    public Task AddAsync(T entity)
    {
        entity.Created = DateTime.Now;
        entity.Modified = DateTime.Now;

        return _dbContext.InsertOneAsync(entity);
    }

    public Task DeleteAsync(Guid id) => _dbContext.DeleteOneAsync(Builders<T>.Filter.Eq(i => i.Id, id));

    public Task ReplaceAsync(T entity)
    {
        entity.Modified = DateTime.Now;

        return _dbContext.ReplaceOneAsync(Builders<T>.Filter.Eq(i => i.Id, entity.Id), entity);
    }

    public Task ToggleActivationAsync(Guid id, bool activation)
    {
        var filter = Builders<T>.Filter.Eq(i => i.Id, id);
        var update = Builders<T>.Update
            .Set(i => i.IsEnabled, activation)
            .Set(i => i.Modified, DateTime.Now);

        return _dbContext.UpdateOneAsync(filter, update);
    }
}

