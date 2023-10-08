using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Reservations;

namespace backend_server.Repositories.Interfaces;

public interface IReservationRepository : IBaseRepository<Reservation>
{
    Task UpdateNoOfPassengers(UpdateReservationDto reservationDto);
}