import { HttpClient } from "@http/HttpClient";

export class Employee {
  static getEmployees(): Promise<any> {
    return HttpClient.get('/employees')
  }
}