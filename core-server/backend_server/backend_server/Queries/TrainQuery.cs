using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using MongoDB.Driver;

namespace backend_server.Queries;

public class TrainQuery : ITrainQuery
{
    private readonly IMongoCollection<Train> _dbContext;

    public TrainQuery()
    {
        _dbContext = DataBaseConnection.database.GetCollection<Train>("trains");
    }

    public Task<Train> GetEntityById(Guid id)
    {
        var filter = Builders<Train>.Filter.Eq(i => i.Id, id);
        return _dbContext.Find(filter).SingleOrDefaultAsync();
    }

    public Task<List<Train>> GetEntities()
    {
        var filter = Builders<Train>.Filter.Empty;
        return _dbContext.Find(filter).ToListAsync();
    }
}