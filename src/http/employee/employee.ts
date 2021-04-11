import { HttpClient } from "@core/HttpClient/HttpClient";

export class Employee {
  static getEmployees(): Promise<any> {
    return HttpClient.get('/employees')
  }
}