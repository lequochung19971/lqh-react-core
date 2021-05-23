export interface IEmployeeForm {
  firstName: string;
  lastName: string;
  fullName: string;
  dob: string;
  age: string;
  test: {
    value: string;
  }[];
  test2: {
    value1: string,
    value2: string,
  }
}