import { AuthLocalStorageKeys, AuthUrIs, TokenType } from '@shared/enums';
import { HttpClient } from '@shared/HttpClient/HttpClient';
import { IAuthToken, IJwtToken, ILoginParams } from '@shared/types';
import { BaseAuth } from './BaseAuth';

export class JwtAuth extends BaseAuth {
  guid = new Date();
  async login(email: string, password: string): Promise<any> {
    const params: ILoginParams = {
      email,
      password,
    };
    const response = await HttpClient.post<IJwtToken, ILoginParams>(AuthUrIs.LOGIN, params, null, false);
    this.setAuthToken(response);
  }

  getAuthToken(): IAuthToken | undefined {
    const { httpConfig } = HttpClient;
    const accessToken = localStorage.getItem(httpConfig?.authConfig?.authStorageKeys?.accessToken || AuthLocalStorageKeys.JWT_TOKEN) ?? '';
    const refreshToken = localStorage.getItem(httpConfig?.authConfig?.authStorageKeys?.refreshToken || AuthLocalStorageKeys.REFRESH_TOKEN) ?? '';

    if (!accessToken) return;

    return {
      tokenType: TokenType.Bearer,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(): Promise<void> {
    const token = this.getAuthToken();
    if (!token) return;
    const { refreshToken } = token;
    const params = { refreshToken };
    const response = await HttpClient.post<IJwtToken, { refreshToken: string }>(
      AuthUrIs.REFRESH_TOKEN,
      params,
      null,
      false,
    );
    this.setAuthToken(response);
  }
}
