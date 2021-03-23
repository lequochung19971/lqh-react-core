import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpClientErrorModel extends Error {
  constructor(public message: string, public code: string) {
    super(message);
  }
}

type HttpClientRequestConfig = AxiosRequestConfig;
type HttpClientResponse<T = any> = AxiosResponse<T>;
type HttpError<T = any> = AxiosError<T>;
type HttpClientParams<T = unknown> = {
  [P in keyof T]?: T[P];
};

type HttpClientPayload<T = unknown> = {
  [P in keyof T]?: T[P];
};

export class HttpClient {
  private static _httpConfig: HttpClientRequestConfig;
  private static _authenticator: any;

  static setHttpConfig(config: HttpClientRequestConfig): void {
    this._httpConfig = config;
  }

  static getHttpConfig(): HttpClientRequestConfig {
    return this._httpConfig;
  }

  static async configs(
    config: HttpClientRequestConfig,
    isAuthenticated = true,
  ): Promise<HttpClientRequestConfig> {
    const authHeader = 'Bearer ...';
    const { baseURL } = this._httpConfig;
    let headers = config?.headers || {};

    if (authHeader !== '' && isAuthenticated) {
      headers = {
        ...headers,
        Authorization: authHeader,
      };
    }
    return { ...config, headers, baseURL };
  }

  private static getUri(uri: string): string {
    return `${this._httpConfig.baseURL}${uri}`;
  }

  private static success<T>(response: HttpClientResponse<T>) {
    return response.data as T;
  }

  private static error(err: HttpError): void {
    const { code: errorCode = 'unknown' } = err.response?.data;
    const { message } = err.response?.data || err;
    throw new HttpClientErrorModel(message, errorCode);
  }

  static async get<T, TParams>(
    uri: string,
    params: HttpClientParams<TParams>,
    isAuthenticated = true,
  ): Promise<T | void> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const response = await axios.get(this.getUri(uri), config);
      return this.success<T>(response);
    } catch (error) {
      return this.error(error);
    }
  }

  static async post<T, TParams, TPayload>(
    uri: string,
    payload: HttpClientPayload<TPayload>,
    params: HttpClientParams<TParams>,
    isAuthenticated = true,
  ): Promise<T | void> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const response: HttpClientResponse<T> = await axios.post<T>(this.getUri(uri), payload, config);
      return this.success<T>(response);
    } catch (error) {
      return this.error(error);
    }
  }

  static async patch<T, TParams, TPayload>(
    uri: string,
    payload: HttpClientPayload<TPayload>,
    params: HttpClientParams<TParams>,
    isAuthenticated = true,
  ): Promise<T | void> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const response: HttpClientResponse<T> = await axios.patch<T>(this.getUri(uri), payload, config);
      return this.success<T>(response);
    } catch (error) {
      return this.error(error);
    }
  }

  static async put<T, TParams, TPayload>(
    uri: string,
    payload: HttpClientPayload<TPayload>,
    params: HttpClientParams<TParams>,
    isAuthenticated = true,
  ): Promise<T | void> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const response: HttpClientResponse<T> = await axios.put<T>(this.getUri(uri), payload, config);
      return this.success<T>(response);
    } catch (error) {
      return this.error(error);
    }
  }

  static async delete<T, TParams>(
    uri: string,
    params: HttpClientParams<TParams>,
    isAuthenticated = true,
  ): Promise<T | void> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const response: HttpClientResponse<T> = await axios.delete<T>(this.getUri(uri), config);
      return this.success<T>(response);
    } catch (error) {
      return this.error(error);
    }
  }
}
