using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Reservations;
using backend_server.Repositories.Interfaces;
using MongoDB.Driver;

namespace backend_server.Repositories;

// ReservationRepository class for specific repository operations related to Reservation entities.
public sealed class ReservationRepository : BaseRepository<Reservation>, IReservationRepository
{
    // Constructor that initializes the database context for Reservation entities.
    public ReservationRepository()
    {
        _dbContext = DataBaseConnection.database.GetCollection<Reservation>("reservations");
    }

    // Updates the number of passengers for a reservation in the database.
    public Task UpdateNoOfPassengersAsync(UpdateReservationDto reservationDto)
    {
        var filter = Builders<Reservation>.Filter.Eq(i => i.Id, reservationDto.Id);
        var update = Builders<Reservation>.Update
            .Set(i => i.NoOfPassengers, reservationDto.NoOfPassengers)
            .Set(i => i.Modified, DateTime.Now);

        return _dbContext.UpdateOneAsync(filter, update);
    }
}