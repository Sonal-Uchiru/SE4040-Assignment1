using System;
namespace backend_server.Models.Dtos.Reservations;

public class UpdateReservationDto
{
	public Guid Id { get; set; }

	public int NoOfPassengers { get; set; }
}

