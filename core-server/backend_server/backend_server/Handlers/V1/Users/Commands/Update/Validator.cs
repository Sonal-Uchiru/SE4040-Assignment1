using backend_server.Utills.FlutentValidations;
using FluentValidation;

namespace backend_server.Handlers.V1.Users.Commands.Update;

// Validator class for user update command.
public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        // Validation rules for user update command.
        RuleFor(i => i.FirstName).NotEmpty().WithMessage("First Name is required.");
        RuleFor(i => i.LastName).NotEmpty().WithMessage("Last Name is required.");
        RuleFor(i => i.Mobile).NotEmpty().MinimumLength(10).MaximumLength(10).WithMessage("Mobile Number is required.");
    }
}