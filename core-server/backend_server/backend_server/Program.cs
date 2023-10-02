using System.Text;
using backend_server;
using backend_server.Queries;
using backend_server.Queries.Interfaces;
using backend_server.Repositories;
using backend_server.Repositories.Interfaces;
using backend_server.Services;
using backend_server.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.CustomSchemaIds(type => type.ToString());

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter the JWT token in the format 'Bearer {token}'.",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
    });

    // Set up a custom operation filter to include the JWT token input box in Swagger UI
    //options.OperationFilter<AddAuthorizationHeaderOperationFilter>();
});

builder.Services.AddRouting(options => options.LowercaseUrls = true);

builder.Services.AddSingleton<DataBaseConnection>();

builder.Services.AddAutoMapper(typeof(BaseMapperProfile));

// DI
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<IAuthenticationService, AuthenticationService>();

builder.Services.AddSingleton<IUserRepository, UserRepository>();
builder.Services.AddSingleton<IUserQuery, UserQuery>();

builder.Services.AddSingleton<ITrainRepository, TrainRepository>();
builder.Services.AddSingleton<ITrainQuery, TrainQuery>();

builder.Services.AddSingleton<IReservationRepository, ReservationRepository>();
builder.Services.AddSingleton<IReservationQuery, ReservationQuery>();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Program>());

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "d",
            ValidAudience = "d",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("dd")),
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

