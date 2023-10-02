using FluentValidation;

namespace backend_server.Handlers.V1.Reservations.Commands.Update;

public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(i => i.NoOfPassengers).NotEmpty().WithMessage("No of Passengers are required.");
    }
}