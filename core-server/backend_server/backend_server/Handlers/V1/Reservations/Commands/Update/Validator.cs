using backend_server.Utills.FlutentValidations;
using FluentValidation;

namespace backend_server.Handlers.V1.Reservations.Commands.Update;

public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(i => i.NoOfPassengers).NotEmpty().MaximumLength(1).WithMessage("No of Passengers are required.");
    }
}