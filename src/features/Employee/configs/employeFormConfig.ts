import { AddressModel } from '@shared/models';
import { maxLength, minLength, required, validateEmail, validatePhoneNumber } from '@shared/utils';
import { createValidationForm } from '@shared/utils/hookform/validationResolver';

import { IEmployeeForm } from '../types/employeeForm.interface';

export const defaultValues: IEmployeeForm = {
  firstName: '',
  lastName: '',
  fullName: '',
  dob: '',
  age: '',
  email: '',
  phone: '',
  department: [],
  position: [],
  addressModel: {} as AddressModel,
  addressValue: '',
  test: [
    {
      value: '123',
    },
    {
      value: '123',
    },
  ],
  test2: {
    value1: '',
    value2: '',
  },
};

export const validators = createValidationForm<IEmployeeForm>({
  firstName: [required, maxLength(30), minLength(2)],
  lastName: [required, maxLength(30), minLength(2)],
  fullName: [required, minLength(2)],
  dob: [required],
  age: [required],
  email: [required, validateEmail],
  phone: [required, validatePhoneNumber, maxLength(10)],
  department: [required],
  position: [required],
  test: [
    {
      value: [required],
    },
  ],
  test2: {
    value1: [required],
  },
});
