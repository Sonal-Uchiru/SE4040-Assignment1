using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using MongoDB.Driver;

namespace backend_server.Queries;

public class ReservationQuery : IReservationQuery
{
    private readonly IMongoCollection<Reservation> _dbContext;

    public ReservationQuery()
    {
        _dbContext = DataBaseConnection.database.GetCollection<Reservation>("reservations");
    }

    public Task<Reservation> GetEntityById(Guid id)
    {
        var filter = Builders<Reservation>.Filter.Eq(i => i.Id, id);
        return _dbContext.Find(filter).SingleOrDefaultAsync();
    }

    public Task<List<Reservation>> GetEntities()
    {
        var filter = Builders<Reservation>.Filter.Empty;
        return _dbContext.Find(filter).ToListAsync();
    }

    public Task<List<Reservation>> GetUserEntities(Guid id)
    {
        var filter = Builders<Reservation>.Filter.Eq(i => i.UserId, id);
        return _dbContext.Find(filter).ToListAsync();
    }
}