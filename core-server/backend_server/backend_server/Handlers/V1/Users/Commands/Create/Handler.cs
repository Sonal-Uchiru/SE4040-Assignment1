using backend_server.Models.Commons.Exceptions;
using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using backend_server.Repositories.Interfaces;
using backend_server.Services.Interfaces;
using MediatR;

namespace backend_server.Handlers.V1.Users.Commands.Create;

// Handler for user creation command.
public class Handler : IRequestHandler<Command, Response>
{
    private readonly IUserService _userService;
    private readonly IUserQuery _userQuery;
    private readonly IUserRepository _userRepository;

    public Handler(IUserService userService, IUserQuery userQuery, IUserRepository userRepository)
    {
        _userService = userService;
        _userQuery = userQuery;
        _userRepository = userRepository;
    }

    public async Task<Response> Handle(Command command, CancellationToken cancellationToken)
    {
        // Check if a user with the provided NIC already exists.
        if (await _userQuery.AnyUserByNicAsync(command.Nic))
        {
            throw new ValidationException(errorReason: "User already exists!");
        }

        // Generate a new unique user ID.
        var id = Guid.NewGuid();

        // Set the user's password, using their NIC as a default if no password is provided.
        var password = command.Password == "" ? command.Nic : command.Password;

        // Create a new user with the provided information.
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

        // Add the new user to the repository.
        await _userRepository.AddAsync(user);

        return new Response
        {
            Id = id
        };
    }
}