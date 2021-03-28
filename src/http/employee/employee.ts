import { HttpClient } from "../../../core/httpClient/httpClient";

export class Employee {
  static getEmployees(): Promise<any> {
    return HttpClient.get('/employees')
  }
}