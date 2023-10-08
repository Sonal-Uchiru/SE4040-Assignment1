using backend_server.Utills.FlutentValidations;
using FluentValidation;

namespace backend_server.Handlers.V1.Trains.Commands.Update;

public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(i => i.Name).NotEmpty().WithMessage("Name is required.");
        RuleFor(i => i.Model).NotEmpty().WithMessage("Model is required.");
        RuleFor(i => i.DriverName).NotEmpty().WithMessage("Driver Name is required.");
        RuleFor(i => i.Contact).NotEmpty().MinimumLength(10).MaximumLength(10).WithMessage("Contact is required.");
        RuleFor(i => i.NoOfSeats).NotEmpty().MaximumLength(5).WithMessage("No of seats are required.");
        RuleFor(i => i.StartingStation).NotEmpty().WithMessage("Stating Station is required.");
        RuleFor(i => i.EndingStation).NotEmpty().WithMessage("Ending Station is required.");
    }
}