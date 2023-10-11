using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using MongoDB.Driver;

namespace backend_server.Queries;

public sealed class ReservationQuery : BaseQuery<Reservation>, IReservationQuery
{
    public ReservationQuery()
    {
        _dbContext = DataBaseConnection.database.GetCollection<Reservation>("reservations");
    }

    public Task<List<Reservation>> GetUserEntitiesAsync(Guid id)
    {
        var filter = Builders<Reservation>.Filter.Eq(i => i.UserId, id);
        return _dbContext.Find(filter).ToListAsync();
    }

    public Task<bool> IsTrainContainReservationByTrainIdAsync(Guid id)
    {
        var filter = Builders<Reservation>.Filter.Eq(i => i.TrainId, id);
        return _dbContext.Find(filter).AnyAsync();
    }
}