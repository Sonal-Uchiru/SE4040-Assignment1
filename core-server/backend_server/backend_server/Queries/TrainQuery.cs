using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;

namespace backend_server.Queries;

public sealed class TrainQuery : BaseQuery<Train>, ITrainQuery
{
    public TrainQuery()
    {
        _dbContext = DataBaseConnection.database.GetCollection<Train>("trains");
    }
}