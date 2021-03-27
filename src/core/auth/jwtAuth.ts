import { HttpClient } from '../httpClient/httpClient';
import { BaseAuth } from './baseAuth';
import { AuthUrIs, TokenType } from './enums';
import { IAuthToken, IJwtToken, ILoginParams } from './types';

export class JwtAuth extends BaseAuth {
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
    const accessToken = localStorage.getItem(httpConfig.authConfig.authStorageKeys.accessToken) ?? '';
    const refreshToken = localStorage.getItem(httpConfig.authConfig.authStorageKeys.refreshToken) ?? '';

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
