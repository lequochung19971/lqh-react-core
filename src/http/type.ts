import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type FnParams<TData extends any = any> = {
  data?: TData;
  config?: AxiosRequestConfig;
};

export type ApiFunction<TData = Object, TResponse = any> = (
  params?: FnParams<TData>,
) => Promise<AxiosResponse<TResponse>>;
