using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend_server.Models.Dtos.Authentications;
using backend_server.Models.Types;
using backend_server.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace backend_server.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly IJwtService _jwtService;

    public AuthenticationService(IJwtService jwtService)
    {
        _jwtService = jwtService;
    }

    public string GenerateJWT(Guid userId, UserRoles role)
    {
        string secretKey = "8V7n5phLLJj0GYbJHHkqhs2iNlvAvpPp4q9iutGwj24PDDcYK2";

        var claims = new Claim[]
        {
            new (JwtRegisteredClaimNames.Sub, "JWT_Authentication"),
            new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new (JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
            new ("user_id", userId.ToString()),
            new ("role", role.ToString())
        };

        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secretKey));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "booking_passage_core",
            audience: "booking_passage_client",
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );

        var tokenHandler = new JwtSecurityTokenHandler();

        return tokenHandler.WriteToken(token);
    }

    public PayloadDto GetUserPayloadByContext(HttpContext context)
    {
        var userToken = _jwtService.GetToken(context);
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.ReadJwtToken(userToken);

        _ = Guid.TryParse(token.Claims.First(claim => claim.Type == "user_id").Value, out Guid guidValue);

        Enum.TryParse(token.Claims.First(claim => claim.Type == "role").Value, true, out UserRoles userRole);

        return new PayloadDto
        {
            UserId = guidValue,
            Role = userRole
        };
    }

}

