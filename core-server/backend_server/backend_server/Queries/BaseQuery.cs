using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using MongoDB.Driver;

namespace backend_server.Queries;

public class BaseQuery<T> : IBaseQuery<T> where T: BaseEntity
{
    public  static IMongoCollection<T> _dbContext;

    public Task<T> GetEntityById(Guid id)
    {
        var filter = Builders<T>.Filter.Eq(i => i.Id, id);
        return _dbContext.Find(filter).SingleOrDefaultAsync();
    }

    public Task<List<T>> GetEntities()
    {
        var filter = Builders<T>.Filter.Empty;
        return _dbContext.Find(filter).ToListAsync();
    }
}

