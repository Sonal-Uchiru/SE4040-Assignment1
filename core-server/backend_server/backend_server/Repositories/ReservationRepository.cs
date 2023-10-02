using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Reservations;
using backend_server.Repositories.Interfaces;
using MongoDB.Driver;

namespace backend_server.Repositories;

public class ReservationRepository : IReservationRepository
{
    private readonly IMongoCollection<Reservation> _dbContext;

    public ReservationRepository()
    {
        _dbContext = DataBaseConnection.database.GetCollection<Reservation>("reservations");
    }

    public Task Add(Reservation entity) => _dbContext.InsertOneAsync(entity);

    public Task UpdateNoOfPassengers(UpdateReservationDto reservationDto)
    {
        var filter = Builders<Reservation>.Filter.Eq(i => i.Id, reservationDto.Id);
        var update = Builders<Reservation>.Update.Set(i => i.NoOfPassengers, reservationDto.NoOfPassengers);

        return _dbContext.UpdateOneAsync(filter, update);
    }

    public Task Delete(Guid id) => _dbContext.DeleteOneAsync(Builders<Reservation>.Filter.Eq(i => i.Id, id));
}


