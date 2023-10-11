﻿using backend_server.Models.Commons.Responses;

namespace backend_server.Handlers.V1.Reservations.Commands.Create;

// Represents a response object typically used for operations that return an entity's unique identifier.
public class Response : BaseResponse
{
    public required Guid Id { get; init; } // Unique identifier of the entity
}