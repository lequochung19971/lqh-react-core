// import { JwtAuth } from "core/auth/jwtAuth";
import { Employee } from './employee';
import { HttpClient } from './HttpClient';

export function HttpInit (): void {
  HttpClient.httpConfig = {
    baseURL: 'http://localhost:3000',
  };
}

export { Employee };
