import { AxiosResponse } from "axios";
import ModelConstants from "../../../constants/ModelConstants";
import { HttpMethods } from "../../../types/enums/HttpMethods";
import { Versions } from "../../../types/enums/Versions";
import { protectedApiAsync } from "../../ProtectedApi";
import { protectedListApiAsync } from "../../ProtectedListApi";

class UserProtectedApi {
  public async updateAsync(data: any): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Put,
      Versions.V1,
      ModelConstants.USERS,
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

  public async deleteAsync(): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Delete,
      Versions.V1,
      ModelConstants.USERS
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

}

export default new UserProtectedApi();
