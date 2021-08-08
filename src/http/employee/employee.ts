import { HttpClient } from '@http/httpClient';

export class Employee {
  static getEmployees(): Promise<any> {
    return HttpClient.get('/employees');
  }
}
