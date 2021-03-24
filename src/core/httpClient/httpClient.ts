import axios from 'axios';
import queryString from 'query-string';
import { HttpClientErrorModel } from './model';
import { HttpClientConfig, HttpClientOtherConfig, HttpClientPayload, HttpClientResponse, HttpError } from './type';

export class HttpClient {
  private static _httpConfig: HttpClientConfig;
  private static _authenticator: any;

  static setHttpConfig(config: HttpClientConfig): void {
    this._httpConfig = config;
  }

  static getHttpConfig(): HttpClientConfig {
    return this._httpConfig;
  }

  static async configs(config: HttpClientOtherConfig, isAuthenticated = true): Promise<HttpClientConfig> {
    const paramsSerializer = (params: any) => queryString.stringify(params);

    const headers = isAuthenticated ? this.getConfigHeader(config) : {};

    return { ...this._httpConfig, headers, paramsSerializer };
  }

  private static getConfigHeader(config: HttpClientConfig): any {
    const authHeader = 'Bearer ...';
    let headers = config?.headers || {};

    if (authHeader) {
      headers = {
        ...headers,
        Authorization: authHeader,
      };
    }

    return headers;
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

  static async get<T>(uri: string, otherConfig: HttpClientOtherConfig, isAuthenticated = true): Promise<T | void> {
    try {
      const config = await this.configs(otherConfig, isAuthenticated);
      const response = await axios.get(this.getUri(uri), config);
      return this.success<T>(response);
    } catch (error) {
      return this.error(error);
    }
  }

  static async post<T, TPayload>(
    uri: string,
    payload: HttpClientPayload<TPayload>,
    otherConfig: HttpClientOtherConfig,
    isAuthenticated = true,
  ): Promise<T | void> {
    try {
      const config = await this.configs(otherConfig, isAuthenticated);
      const response: HttpClientResponse<T> = await axios.post<T>(this.getUri(uri), payload, config);
      return this.success<T>(response);
    } catch (error) {
      return this.error(error);
    }
  }

  static async patch<T, TPayload>(
    uri: string,
    payload: HttpClientPayload<TPayload>,
    otherConfig: HttpClientOtherConfig,
    isAuthenticated = true,
  ): Promise<T | void> {
    try {
      const config = await this.configs(otherConfig, isAuthenticated);
      const response: HttpClientResponse<T> = await axios.patch<T>(this.getUri(uri), payload, config);
      return this.success<T>(response);
    } catch (error) {
      return this.error(error);
    }
  }

  static async put<T, TPayload>(
    uri: string,
    payload: HttpClientPayload<TPayload>,
    otherConfig: HttpClientOtherConfig,
    isAuthenticated = true,
  ): Promise<T | void> {
    try {
      const config = await this.configs(otherConfig, isAuthenticated);
      const response: HttpClientResponse<T> = await axios.put<T>(this.getUri(uri), payload, config);
      return this.success<T>(response);
    } catch (error) {
      return this.error(error);
    }
  }

  static async delete<T>(uri: string, otherConfig: HttpClientOtherConfig, isAuthenticated = true): Promise<T | void> {
    try {
      const config = await this.configs(otherConfig, isAuthenticated);
      const response: HttpClientResponse<T> = await axios.delete<T>(this.getUri(uri), config);
      return this.success<T>(response);
    } catch (error) {
      return this.error(error);
    }
  }
}
