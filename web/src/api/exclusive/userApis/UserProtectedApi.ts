import { AxiosResponse } from "axios";
import ModelConstants from "../../../constants/ModelConstants";
import { HttpMethods } from "../../../types/enums/HttpMethods";
import { Versions } from "../../../types/enums/Versions";
import { protectedApiAsync } from "../../ProtectedApi";
import { protectedListApiAsync } from "../../ProtectedListApi";

class UserProtectedApi {
  public async updateAsync(data: any,  id: string): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Put,
      Versions.V1,
      `${ModelConstants.USERS}/${id}`,
      data
    );
  }

  public async saveAsync(data: any): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Post,
      Versions.V1,
      ModelConstants.USERS,
      data
    );
  }

  public async deleteAsync(id: string): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Delete,
      Versions.V1,
      `${ModelConstants.USERS}/${id}`
    );
  }

  public async getAsync(): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Get,
      Versions.V1,
      ModelConstants.USERS
    );
  }

  public async getListAsync(): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Get,
      Versions.V1,
      `${ModelConstants.USERS}/list`
    );
  }

  public async toggleActivationAsync(id: string): Promise<AxiosResponse> {
    return await protectedApiAsync(
        HttpMethods.Patch,
        Versions.V1,
      `${ModelConstants.USERS}/${id}/toggleactivation`
    );
  }

}

export default new UserProtectedApi();
