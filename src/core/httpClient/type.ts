import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export type HttpClientConfig = Partial<AxiosRequestConfig>;
export type HttpClientOtherConfig = Omit<AxiosRequestConfig, 'baseURL' | 'paramsSerializer'>;
export type HttpClientResponse<T = any> = Partial<AxiosResponse<T>>;
export type HttpError<T = any> = Partial<AxiosError<T>>;
export type HttpClientPayload<T = unknown> = {
  [P in keyof T]?: T[P];
};