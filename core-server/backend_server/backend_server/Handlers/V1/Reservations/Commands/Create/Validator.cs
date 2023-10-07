using backend_server.Utills.FlutentValidations;
using FluentValidation;

namespace backend_server.Handlers.V1.Reservations.Commands.Create;

public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(i => i.TrainName).NotEmpty().WithMessage("Train Name is required.");
        RuleFor(i => i.StartingStation).NotEmpty().WithMessage("Starting Station is required.");
        RuleFor(i => i.EndingStation).NotEmpty().WithMessage("Ending Station is required.");
        RuleFor(i => i.DepartureDate).NotEmpty().WithMessage("Departure Date is required.");
        RuleFor(i => i.ArrivalTime).NotEmpty().WithMessage("Arrival Time is required.");
        RuleFor(i => i.DepartureTime).NotEmpty().WithMessage("Departure Time is required.");
        RuleFor(i => i.NoOfPassengers).NotEmpty().MaximumLength(1).WithMessage("No of Passengers are required.");
        RuleFor(i => i.PerPersonPrice).NotEmpty().MaximumLength(6).WithMessage("Per person Price is required.");
    }
}