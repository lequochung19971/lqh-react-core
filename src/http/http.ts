// import { JwtAuth } from "core/auth/jwtAuth";
import { HttpClient } from './httpClient';

export function HttpInit (): void {
  HttpClient.httpConfig = {
    baseURL: 'http://localhost:3000',
  };
}
