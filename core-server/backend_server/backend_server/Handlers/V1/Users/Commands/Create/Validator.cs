using backend_server.Utills.FlutentValidations;
using FluentValidation;

namespace backend_server.Handlers.V1.Users.Commands.Create;

// Validator for the user creation command.
public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(i => i.Nic)
            .NotEmpty()
            .MinimumLength(12)
            .MaximumLength(12)
            .WithMessage("NIC is required and must be exactly 12 characters.");

        RuleFor(i => i.Role)
            .Must(role => (int)role >= 1 && (int)role <= 3)
            .WithMessage("Valid roles are 1, 2, and 3.");

        RuleFor(i => i.Mobile)
            .MinimumLength(10)
            .MaximumLength(10)
            .WithMessage("Mobile Number is required and must be exactly 10 digits.");

        RuleFor(i => i.Password)
            .NotEmpty()
            .WithMessage("Password is required.")
            .MinimumLength(8)
            .WithMessage("Password must be at least 8 characters long.")
            .Matches(@"[A-Z]")
            .WithMessage("Password must contain at least one uppercase letter.")
            .Matches(@"[a-z]")
            .WithMessage("Password must contain at least one lowercase letter.")
            .Matches(@"[0-9]")
            .WithMessage("Password must contain at least one digit.")
            .Matches(@"[!@#$%^&*()-_=+{};:,<.>]")
            .WithMessage("Password must contain at least one special character (!@#$%^&*()-_=+{};:,<.>).");
    }
}