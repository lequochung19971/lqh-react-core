import { JwtAuth } from "../../core/auth/jwtAuth";
import { HttpClient } from "../../core/httpClient/httpClient";
import { Employee } from "./employee";

HttpClient.httpConfig = {
  baseURL: 'http://localhost:3000',
  authConfig: {
    authInstance: new JwtAuth()
  }
}

export default { Employee };