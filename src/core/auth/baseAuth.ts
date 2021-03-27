import { HttpClient } from '../httpClient/httpClient';
import { AuthLocalStorageKeys, AuthUrIs } from './enums';
import { IAuthenticator, IAuthToken, IBaseTokenResult, IRegisterParams } from './types';

export interface IAuthAdapter extends IAuthenticator {
  login(email: string, password: string): Promise<any>;
  logout(): void;
  register(params: IRegisterParams): Promise<any>;
  refreshToken(): void;
  setAuthToken(tokenResult: IBaseTokenResult): void;
  isAuthenticated(): boolean;
}

export interface IChangePassword {
  changePassword(oldPassword: string, newPassword: string): Promise<any>;
  resetPassword(email: string): Promise<any>;
  setPassword(newPassword: string, otp: string): Promise<any>;
}

export abstract class BaseAuth implements IAuthAdapter, IChangePassword {
  abstract login(email: string, password: string): Promise<any>;
  abstract getAuthToken(): IAuthToken | undefined;
  abstract refreshToken(): void;

  async getAuthHeader(): Promise<string> {
    const authToken = this.getAuthToken();
    if (!authToken?.accessToken) {
      return '';
    }

    return authToken.tokenType ? `${authToken.tokenType} ${authToken.accessToken}` : authToken.accessToken;
  }

  setAuthToken(tokenResult: IBaseTokenResult): void {
    if (tokenResult.accessToken) {
      this.setAccessToken(tokenResult.accessToken);
    }

    if (tokenResult.refreshToken) {
      this.setRefreshToken(tokenResult.refreshToken);
    }
  }

  setAccessToken(accessToken: string): void {
    const { authConfig } = HttpClient.httpConfig;
    localStorage.setItem(
      authConfig.authStorageKeys.accessToken || AuthLocalStorageKeys.JWT_TOKEN,
      JSON.stringify(accessToken),
    );
  }

  setRefreshToken(refreshToken: string): void {
    const { authConfig } = HttpClient.httpConfig;
    localStorage.setItem(
      authConfig.authStorageKeys.refreshToken || AuthLocalStorageKeys.REFRESH_TOKEN,
      JSON.stringify(refreshToken),
    );
  }

  logout(): void {
    const { authConfig } = HttpClient.httpConfig;
    localStorage.removeItem(authConfig.authStorageKeys.accessToken || AuthLocalStorageKeys.JWT_TOKEN);
  }

  async register(params: IRegisterParams): Promise<any> {
    const response = await HttpClient.post<IBaseTokenResult, IRegisterParams>(AuthUrIs.REGISTRATION, params, null, false) as IBaseTokenResult;
    this.setAuthToken(response);
    return response;
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return !!token;
  }

  changePassword(oldPassword: string, newPassword: string): Promise<any> {
    const uri = AuthUrIs.CHANGE_PASSWORD;
    const params = {
      oldPassword,
      newPassword,
    };
    return HttpClient.post(uri, params);
  }

  resetPassword(email: string): Promise<any> {
    const uri = AuthUrIs.RESET_PASSWORD;
    const params = {
      email,
    };
    return HttpClient.post(uri, params);
  }

  setPassword(newPassword: string, otp: string): Promise<any> {
    const uri = AuthUrIs.SET_PASSWORD;
    const params = {
      newPassword,
      otp,
    };
    return HttpClient.post(uri, params);
  }
}
