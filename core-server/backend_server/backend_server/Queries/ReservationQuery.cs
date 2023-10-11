using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using MongoDB.Driver;

namespace backend_server.Queries;

// ReservationQuery class for specific query operations related to reservations.
public sealed class ReservationQuery : BaseQuery<Reservation>, IReservationQuery
{
    public ReservationQuery()
    {
        // Initialize the database context for reservations.
        _dbContext = DataBaseConnection.database.GetCollection<Reservation>("reservations");
    }

    // Retrieves a list of reservations associated with a specific user ID.
    public Task<List<Reservation>> GetUserEntitiesAsync(Guid id)
    {
        var filter = Builders<Reservation>.Filter.Eq(i => i.UserId, id);
        return _dbContext.Find(filter).ToListAsync();
    }

    // Checks if a train contains any reservations by its train ID.
    public Task<bool> IsTrainContainReservationByTrainIdAsync(Guid id)
    {
        var filter = Builders<Reservation>.Filter.Eq(i => i.TrainId, id);
        return _dbContext.Find(filter).AnyAsync();
    }
}