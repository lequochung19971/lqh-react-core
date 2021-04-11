// import { JwtAuth } from "core/auth/jwtAuth";
import { HttpClient } from "@core/HttpClient/HttpClient";
import { Employee } from "./employee";

HttpClient.httpConfig = {
  baseURL: 'http://localhost:3000',
}

export default { Employee };