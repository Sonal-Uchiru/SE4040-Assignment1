using backend_server.Utills.FlutentValidations;
using FluentValidation;

namespace backend_server.Handlers.V1.Reservations.Commands.Update;

// Validator class for validating Command objects, with a focus on the 'NoOfPassengers' property.
public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(i => i.NoOfPassengers).
            NotEmpty()
            .MaximumLength(1)
            .WithMessage("No of Passengers are required.");
    }
}