using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Reservations;

namespace backend_server.Repositories.Interfaces;

public interface IReservationRepository
{

    Task Add(Reservation entity);

    Task UpdateNoOfPassengers(UpdateReservationDto reservationDto);

    Task Delete(Guid id);
}

