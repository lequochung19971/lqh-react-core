import { BaseAuth } from "../auth/BaseAuth";
import { AuthLocalStorageKeys, TokenType } from "../enums/Auth.enum";

export interface IAuthToken {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: TokenType;
  expiredIn?: number;
}

export interface AuthConfig {
  authStorageKeys?: { accessToken: AuthLocalStorageKeys; refreshToken: AuthLocalStorageKeys };
  authInstance?: BaseAuth;
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

export interface IAuthAdapter {
  login(email: string, password: string): Promise<any>;
  logout(): void;
  register(params: IRegisterParams): Promise<any>;
  refreshToken(): void;
  setAuthToken(tokenResult: IBaseTokenResult): void;
  isAuthenticated(): boolean;
  getAuthToken(): IAuthToken | undefined;
  getAuthHeader(): Promise<string>;
}

export interface IChangePassword {
  changePassword(oldPassword: string, newPassword: string): Promise<any>;
  resetPassword(email: string): Promise<any>;
  setPassword(newPassword: string, otp: string): Promise<any>;
}