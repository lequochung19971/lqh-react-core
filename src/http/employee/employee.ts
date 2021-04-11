import { HttpClient } from "@core/HttpClient/httpClient";

export class Employee {
  static getEmployees(): Promise<any> {
    return HttpClient.get('/employees')
  }
}