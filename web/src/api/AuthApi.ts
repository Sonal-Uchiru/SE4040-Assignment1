import axios, { AxiosError, AxiosResponse } from "axios";
import ApiConstants from "../constants/ApiConstants";
import { Versions } from "../types/enums/Versions";
import ModelConstants from "../constants/ModelConstants";

export const authApiAsync = (data: any) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios({
      url: `${ApiConstants.BASE_LOCAL_API_URL}/${Versions.V1}/${ModelConstants.AUTHENTICATION}`,
      method: "POST",
      data,
    })
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};
