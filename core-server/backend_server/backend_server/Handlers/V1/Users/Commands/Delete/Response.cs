﻿using backend_server.Models.Commons.Responses;

namespace backend_server.Handlers.V1.Users.Commands.Delete;

public class Response : BaseResponse
{
	public required Guid Id { get; init; }
}