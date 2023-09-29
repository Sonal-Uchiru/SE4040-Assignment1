using backend_server.Models.DomainModels;
using backend_server.Repositories.Interfaces;
using backend_server.Services.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Users.Commands.Update;

public class Handler : IRequestHandler<Command, Response>
{
    private readonly IUserService _userService;
    private readonly IUserRepository _userRepository;

    public Handler(IUserService userService, IUserRepository userRepository)
    {
        _userService = userService;
        _userRepository = userRepository;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        var id = Guid.NewGuid();
        var password = command.Password == "" ? command.Nic : command.Password;

        var user = new User
        {
            Id = id,
            Nic = command.Nic,
            FirstName = command.FirstName,
            LastName = command.LastName,
            Email = command.Email,
            Mobile = command.Mobile,
            PasswordHash = _userService.HashPassword(password),
            Role = command.Role
        };

        await _userRepository.Add(user);

        return new Response
        {
            Id = id
        };
    }
}
