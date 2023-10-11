using backend_server.Models.DomainModels;
using backend_server.Repositories.Interfaces;

namespace backend_server.Repositories;

public sealed class TrainRepository : BaseRepository<Train>, ITrainRepository
{
    public TrainRepository()
    {
        _dbContext = DataBaseConnection.database.GetCollection<Train>("trains");
    }
}