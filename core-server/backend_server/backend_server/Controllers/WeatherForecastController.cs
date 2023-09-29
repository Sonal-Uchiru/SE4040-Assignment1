using backend_server.Models.DomainModels;
using backend_server.Repositories;
using backend_server.Queries;
using Microsoft.AspNetCore.Mvc;

namespace backend_server.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpPost(Name = "AddUser")]
    public Task Add([FromBody] User user)
    {
        var repo = new UserRepository();

        return repo.Add(user);
    }

    [HttpGet(Name = "GetUser")]
    public Task<List<User>> Get()
    {
        var query = new UserQuery();
        return query.GetEntities();
    }


    [HttpGet("{id:guid}")]
    public Task<User> GetById([FromRoute] Guid id)
    {
        var query = new UserQuery();
        return query.GetEntityById(id);
    }


    [HttpDelete("{id:guid}")]
    public Task DeleteById([FromRoute] Guid id)
    {
        var repo = new UserRepository();
        return repo.Delete(id);
    }


    [HttpPut("{id:guid}")]
    public Task UpdateById([FromRoute] Guid id, [FromBody] User user)
    {
        var repo = new UserRepository();
        return repo.Update(user);
    }


    //[HttpPatch("{id:guid}")]
    //public Task PatchById([FromRoute] Guid id,[FromBody] Command user)
    //{
    //    var repo = new UserRepository();
    //    return repo.UpdateFirstName(id, user.FirstName);
    //}

}

//public class Command
//{
//    public string FirstName { get; set; }
//}
