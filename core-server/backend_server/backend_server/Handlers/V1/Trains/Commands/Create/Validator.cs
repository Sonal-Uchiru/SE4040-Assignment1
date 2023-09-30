using FluentValidation;

namespace backend_server.Handlers.V1.Trains.Commands.Create;

public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(i => i.Name).NotEmpty().WithMessage("Name is required.");
        RuleFor(i => i.Model).NotEmpty().WithMessage("Model is required.");
        RuleFor(i => i.DriverName).NotEmpty().WithMessage("Driver Name is required.");
        RuleFor(i => i.Contact).NotEmpty().WithMessage("Contact is required.");
        RuleFor(i => i.NoOfSeats).NotEmpty().WithMessage("No of seats are required.");
        RuleFor(i => i.StartingStation).NotEmpty().WithMessage("Stating Station is required.");
        RuleFor(i => i.EndingStation).NotEmpty().WithMessage("Ending Station is required.");
    }
}