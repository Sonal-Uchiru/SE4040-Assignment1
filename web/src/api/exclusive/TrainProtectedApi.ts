import { AxiosResponse } from "axios";
import { protectedApiAsync } from "../ProtectedApi";
import { HttpMethods } from "../../types/enums/HttpMethods";
import { Versions } from "../../types/enums/Versions";
import ModelConstants from "../../constants/ModelConstants";
import { protectedListApiAsync } from "../ProtectedListApi";

class TrainProtectedApi {

  public async saveAsync(data: any): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Post,
      Versions.V1,
      ModelConstants.TRAIN,
      data
    );
  }


  public async updateAsync(data: any, id:any): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Put,
      Versions.V1,
      `${ModelConstants.TRAIN}/${id}`,
      data
    );
  }

  public async deleteAsync(id: string): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Delete,
      Versions.V1,
      `${ModelConstants.TRAIN}/${id}`
    );
  }


  public async getAsync(id:any): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Get,
      Versions.V1,
      `${ModelConstants.TRAIN}/${id}`
    );
  }


  public async getListAsync(): Promise<AxiosResponse> {
    return await protectedApiAsync(
        HttpMethods.Get,
      Versions.V1,
      `${ModelConstants.TRAIN}/list`
    );

}

public async getScheduleListAsync(): Promise<AxiosResponse> {
  return await protectedApiAsync(
      HttpMethods.Get,
    Versions.V1,
    `${ModelConstants.TRAIN}/schedules/list`
  );
}

public async getTrainScheduleListAsync(id: string): Promise<AxiosResponse> {
  return await protectedApiAsync(
      HttpMethods.Get,
      Versions.V1,
    `${ModelConstants.TRAIN}/${id}/schedules/list`
  );
}

public async toggleActivationAsync(id: string): Promise<AxiosResponse> {
  return await protectedApiAsync(
      HttpMethods.Patch,
      Versions.V1,
    `${ModelConstants.TRAIN}/${id}/toggleactivation`
  );
}


}

export default new TrainProtectedApi();
