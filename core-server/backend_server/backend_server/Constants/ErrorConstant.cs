namespace backend_server.Constants;

public static class ErrorConstant
{
	public static class ReservationError
	{
        public static readonly string MaximumPasengersError = "Only allowed maximum 4 passengers per reservation";
        public static readonly string OutOfRangeReservationDateError = "Booking date is not withing the 30 days from the reservation date";
        public static readonly string InvalidTimePeriodReservationDeleteError = "Cannot delete the reservation now";
        public static readonly string InvalidTimePeriodReservationUpdateError = "Cannot update the reservation now";
    }

    public static class TrainError
    {
        public static readonly string ReservationsContainedTrainCancelError = "Cannot cancel a train with existing reservations";
        public static readonly string ReservationsContainedTrainDeleteError = "Cannot delete a train with existing reservations";
    }
}

