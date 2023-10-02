using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Trains;
using backend_server.Repositories.Interfaces;
using MongoDB.Driver;

namespace backend_server.Repositories;

public class TrainRepository : ITrainRepository
{
    private readonly IMongoCollection<Train> _dbContext;

    public TrainRepository()
    {
        _dbContext = DataBaseConnection.database.GetCollection<Train>("trains");
    }

    public Task Add(Train entity) => _dbContext.InsertOneAsync(entity);

    public Task Replace(Train entity) => _dbContext.ReplaceOneAsync(Builders<Train>.Filter.Eq(i => i.Id, entity.Id), entity);

    public Task ToggleActivation(Guid id, bool activation)
    {
        var filter = Builders<Train>.Filter.Eq(i => i.Id, id);
        var update = Builders<Train>.Update.Set(i => i.IsEnabled, activation);

        return _dbContext.UpdateOneAsync(filter, update);
    }

    public Task Delete(Guid id) => _dbContext.DeleteOneAsync(Builders<Train>.Filter.Eq(i => i.Id, id));
}


