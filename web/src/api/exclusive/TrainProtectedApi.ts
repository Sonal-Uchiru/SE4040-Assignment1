import { AxiosResponse } from "axios";
import { protectedApiAsync } from "../ProtectedApi";
import { HttpMethods } from "../../types/enums/HttpMethods";
import { Versions } from "../../types/enums/Versions";
import ModelConstants from "../../constants/ModelConstants";
import { protectedListApiAsync } from "../ProtectedListApi";

class TrainProtectedApi {
  public async updateAsync(data: any): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Put,
      Versions.V1,
      ModelConstants.TRAIN,
      data
    );
  }

  public async deleteAsync(): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Delete,
      Versions.V1,
      ModelConstants.TRAIN
    );
  }

  public async getAsync(): Promise<AxiosResponse> {
    return await protectedApiAsync(
      HttpMethods.Get,
      Versions.V1,
      ModelConstants.TRAIN
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
    `${ModelConstants.SCHEDULES}/list`
  );
        
    }
}

export default new TrainProtectedApi();
