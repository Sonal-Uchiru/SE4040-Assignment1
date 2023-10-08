﻿using backend_server.Models.DomainModels;
using backend_server.Queries.Interfaces;
using MongoDB.Driver;

namespace backend_server.Queries;

public sealed class UserQuery : BaseQuery<User>, IUserQuery
{
    public UserQuery()
    {
        _dbContext = DataBaseConnection.database.GetCollection<User>("users");
    }

    public Task<User> GetUserByNIC(string nic)
    {
        var filter = Builders<User>.Filter.Eq(i => i.Nic, nic);
        return _dbContext.Find(filter).SingleOrDefaultAsync();
    }
}