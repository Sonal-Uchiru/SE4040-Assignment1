using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Reservations;
using backend_server.Repositories.Interfaces;
using MongoDB.Driver;

namespace backend_server.Repositories;

public sealed class ReservationRepository : BaseRepository<Reservation>, IReservationRepository
{
    public ReservationRepository()
    {
        _dbContext = DataBaseConnection.database.GetCollection<Reservation>("reservations");
    }

    public Task UpdateNoOfPassengersAsync(UpdateReservationDto reservationDto)
    {
        var filter = Builders<Reservation>.Filter.Eq(i => i.Id, reservationDto.Id);
        var update = Builders<Reservation>.Update
            .Set(i => i.NoOfPassengers, reservationDto.NoOfPassengers)
            .Set(i => i.Modified, DateTime.Now);

        return _dbContext.UpdateOneAsync(filter, update);
    }
}