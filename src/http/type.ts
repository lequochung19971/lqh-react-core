import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ApiParams<TParams = Object, TResponse = any> = (
  params?: TParams,
  config?: AxiosRequestConfig,
) => Promise<AxiosResponse<TResponse>>;
