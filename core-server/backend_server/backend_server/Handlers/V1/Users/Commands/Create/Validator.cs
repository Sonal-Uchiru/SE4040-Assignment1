using FluentValidation;

namespace backend_server.Handlers.V1.Users.Commands.Create;

public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(i => i.Nic).NotEmpty().WithMessage("NIC is required.");
        RuleFor(i => i.Role).NotEmpty().WithMessage("Role is required.");
    }
}