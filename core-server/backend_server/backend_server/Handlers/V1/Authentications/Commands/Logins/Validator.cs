using FluentValidation;

namespace backend_server.Handlers.V1.Authentications.Commands.Logins;

// Validator class for validating Command objects.
public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(i => i.Nic).NotEmpty().WithMessage("NIC is required.");
        RuleFor(i => i.Password).NotEmpty().WithMessage("Password is required.");
    }
}