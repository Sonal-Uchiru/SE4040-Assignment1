using backend_server.Models.DomainModels;

namespace backend_server.Repositories.Interfaces;

public interface ITrainRepository
{

    Task Add(Train entity);

    Task Replace(Train entity);

    Task ToggleActivation(Guid id, bool activation);

    Task Delete(Guid id);
}

