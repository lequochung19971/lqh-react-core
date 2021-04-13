// import { JwtAuth } from "core/auth/jwtAuth";
import { HttpClient } from '@shared/httpClient/httpClient';
import { Employee } from './employee';

HttpClient.httpConfig = {
  baseURL: 'http://localhost:3000',
};

export default { Employee };
