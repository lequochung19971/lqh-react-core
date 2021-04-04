import { AxiosError, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthConfig } from "./auth.type";

export type HttpClientConfig = Partial<AxiosRequestConfig> & {
  authConfig?: AuthConfig;
};
export type HttpClientOtherConfig = Omit<HttpClientConfig, 'baseURL' | 'paramsSerializer'>;
export type HttpClientResponse<T = any> = Partial<AxiosResponse<T>>;
export type HttpClientError<T = any> = Partial<AxiosError<T>>;
export type HttpClientPayload<T = unknown> = {
  [P in keyof T]?: T[P];
};
export type HttpInterceptor = {
  request: AxiosInterceptorManager<AxiosRequestConfig>;
  response: AxiosInterceptorManager<AxiosResponse>;
}