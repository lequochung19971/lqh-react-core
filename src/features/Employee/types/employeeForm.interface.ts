import { AddressModel } from "@shared/models";

export interface IEmployeeForm {
  firstName: string;
  lastName: string;
  fullName: string;
  dob: string;
  age: string;
  email: string;
  phone: string;
  department: any;
  position: any;
  addressModel: AddressModel;
  addressValue: string;
  test: {
    value: string;
  }[];
  test2: {
    value1: string,
    value2: string,
  }
}