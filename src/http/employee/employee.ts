import { HttpClient } from "@shared/httpClient/httpClient";
export class Employee {
  static getEmployees(): Promise<any> {
    return HttpClient.get('/employees')
  }
}