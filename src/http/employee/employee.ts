import { HttpClient } from "@shared/HttpClient/HttpClient";
export class Employee {
  static getEmployees(): Promise<any> {
    return HttpClient.get('/employees')
  }
}