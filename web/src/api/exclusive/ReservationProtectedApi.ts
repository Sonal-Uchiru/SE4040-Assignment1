import { AxiosResponse } from "axios";
import { protectedApiAsync } from "../ProtectedApi";
import { HttpMethods } from "../../types/enums/HttpMethods";
import { Versions } from "../../types/enums/Versions";
import ModelConstants from "../../constants/ModelConstants";

class ReservationProtectedApi {
  public async saveAsync(data: any): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Post,
      Versions.V1,
      ModelConstants.RESERVATIONS,
      data
    );
  }

  public async updateAsync(data: any, id: string, ): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Patch,
      Versions.V1,
      `${ModelConstants.RESERVATIONS}/${id}`,
      data
    );
  }
  public async deleteAsync(id: string): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Delete,
      Versions.V1,
      `${ModelConstants.RESERVATIONS}/${id}`
    );
  }

  public async getListAsync(): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Get,
      Versions.V1,
      `${ModelConstants.RESERVATIONS}/list`
    );
  }
}

export default new ReservationProtectedApi();
