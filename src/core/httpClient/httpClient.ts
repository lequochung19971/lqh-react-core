import axios from 'axios';
import queryString from 'query-string';
import { IAuthenticator } from '../auth/types';
import { HttpClientErrorModel } from './model';
import {
  HttpClientConfig,
  HttpClientOtherConfig,
  HttpClientPayload,
  HttpClientResponse,
  HttpError,
  HttpInterceptor,
} from './types';

export class HttpClient {
  private static _httpConfig: HttpClientConfig;
  private static _authenticator: IAuthenticator;

  static set httpConfig(config: HttpClientConfig) {
    this._httpConfig = config;
  }

  static get httpConfig(): HttpClientConfig {
    return this._httpConfig;
  }

  static set authenticator(authenticator: IAuthenticator) {
    this._authenticator = authenticator;
  }

  static get interceptors(): HttpInterceptor {
    return {
      request: axios.interceptors.request,
      response: axios.interceptors.response,
    };
  }

  static async configs(config: HttpClientOtherConfig, isAuthenticated = true): Promise<HttpClientConfig> {
    const paramsSerializer = (params: any) => queryString.stringify(params);

    const headers = isAuthenticated ? this.getConfigHeader(config) : {};

    return { ...(this._httpConfig || {}), headers, paramsSerializer };
  }

  private static getConfigHeader(config: HttpClientConfig): any {
    const authHeader = this._authenticator.getAuthHeader();
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

  private static error(err: HttpError): Error {
    const { code: errorCode = 'unknown' } = err.response?.data;
    const { message } = err.response?.data || err;
    return new HttpClientErrorModel(message, errorCode);
  }

  static async get<T>(uri: string, otherConfig?: HttpClientOtherConfig | null, isAuthenticated = true): Promise<T> {
    try {
      const config = await this.configs(otherConfig || ({} as HttpClientOtherConfig), isAuthenticated);
      const response = await axios.get(this.getUri(uri), config);
      return this.success<T>(response);
    } catch (error) {
      throw this.error(error);
    }
  }

  static async post<T, TPayload>(
    uri: string,
    payload: HttpClientPayload<TPayload>,
    otherConfig?: HttpClientOtherConfig | null,
    isAuthenticated = true,
  ): Promise<T> {
    try {
      const config = await this.configs(otherConfig || ({} as HttpClientOtherConfig), isAuthenticated);
      const response: HttpClientResponse<T> = await axios.post<T>(this.getUri(uri), payload, config);
      return this.success<T>(response);
    } catch (error) {
      throw this.error(error);
    }
  }

  static async patch<T, TPayload>(
    uri: string,
    payload: HttpClientPayload<TPayload>,
    otherConfig?: HttpClientOtherConfig | null,
    isAuthenticated = true,
  ): Promise<T> {
    try {
      const config = await this.configs(otherConfig || ({} as HttpClientOtherConfig), isAuthenticated);
      const response: HttpClientResponse<T> = await axios.patch<T>(this.getUri(uri), payload, config);
      return this.success<T>(response);
    } catch (error) {
      throw this.error(error);
    }
  }

  static async put<T, TPayload>(
    uri: string,
    payload: HttpClientPayload<TPayload>,
    otherConfig?: HttpClientOtherConfig | null,
    isAuthenticated = true,
  ): Promise<T> {
    try {
      const config = await this.configs(otherConfig || ({} as HttpClientOtherConfig), isAuthenticated);
      const response: HttpClientResponse<T> = await axios.put<T>(this.getUri(uri), payload, config);
      return this.success<T>(response);
    } catch (error) {
      throw this.error(error);
    }
  }

  static async delete<T>(uri: string, otherConfig?: HttpClientOtherConfig | null, isAuthenticated = true): Promise<T> {
    try {
      const config = await this.configs(otherConfig || ({} as HttpClientOtherConfig), isAuthenticated);
      const response: HttpClientResponse<T> = await axios.delete<T>(this.getUri(uri), config);
      return this.success<T>(response);
    } catch (error) {
      throw this.error(error);
    }
  }
}
