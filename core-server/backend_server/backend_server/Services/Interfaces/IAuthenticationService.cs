using backend_server.Models.Dtos.Authentications;
using backend_server.Models.Types;

namespace backend_server.Services.Interfaces;

public interface IAuthenticationService
{
	public string GenerateJWT(Guid userId, UserRoles role);

	public PayloadDto ExtractToken(string token);
}

