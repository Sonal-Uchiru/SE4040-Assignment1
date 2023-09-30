using FluentValidation;

namespace backend_server.Handlers.V1.Users.Commands.Update;

public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(i => i.FirstName).NotEmpty().WithMessage("First Name is required.");
        RuleFor(i => i.LastName).NotEmpty().WithMessage("Last Name is required.");
        RuleFor(i => i.Mobile).NotEmpty().WithMessage("Mobile Number is required.");
    }
}