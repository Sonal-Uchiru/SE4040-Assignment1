﻿using backend_server.Models.DomainModels;
using backend_server.Models.Dtos.Users;

namespace backend_server.Handlers.V1.Users.Queries.Lists;

public class MapperProfile : BaseMapperProfile
{
    public MapperProfile()
    {
        CreateMap<User, UserResponseDto>();
    }
}

