import axios, { Method, AxiosRequestConfig } from 'axios';
import { config } from '../config';

export const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  timeout: 5000
});
interface IAxiosRequestParams {
  method: Method;
  url: string;
  data?: unknown;
  otherOptions?: AxiosRequestConfig;
}
export const axiosRequest = async ({ method, url, data, otherOptions }: IAxiosRequestParams) =>
  axiosInstance
    .request({
      data,
      method,
      url,
      ...otherOptions
    })
    .then((response) => ({ response, error: undefined }))
    .catch((error) => ({ error, response: undefined }));
