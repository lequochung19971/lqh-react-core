import { AuthLocalStorageKeys, TokenType } from './enums';

export interface IAuthToken {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: TokenType;
  expiredIn?: number;
}

export interface IAuthenticator {
  getAuthToken(): IAuthToken | undefined;
  getAuthHeader(): Promise<string>;
}

export interface AuthConfig {
  authStorageKeys: { accessToken: AuthLocalStorageKeys; refreshToken: AuthLocalStorageKeys };
}

export interface IBaseTokenResult {
  refreshToken: string;
  accessToken: string;
}

export interface IJwtToken extends IBaseTokenResult {
  refreshToken: string;
  accessToken: string;
}

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IRegisterParams extends ILoginParams {
  confirmPassword: string;
}

