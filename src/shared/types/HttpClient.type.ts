import { AxiosError, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthConfig } from "./auth.type";

declare global {
  type Get<T> = {
    [P in keyof T]: T[P];
  };
}

export type HttpClientConfig = Get<AxiosRequestConfig & {
  authConfig?: AuthConfig;
}>;
export type HttpClientOtherConfig = Omit<HttpClientConfig, 'baseURL' | 'paramsSerializer'>;
export type HttpClientResponse<T = any> = Get<AxiosResponse<T>>;
export type HttpClientError<T = any> = Get<AxiosError<T>>;
export type HttpClientPayload<T = unknown> = {
  [P in keyof T]?: T[P];
};
export type HttpInterceptor = {
  request: AxiosInterceptorManager<AxiosRequestConfig>;
  response: AxiosInterceptorManager<AxiosResponse>;
}