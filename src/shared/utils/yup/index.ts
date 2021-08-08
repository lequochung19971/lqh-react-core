import { YupMethodType } from '@shared/types';
import * as yup from 'yup';
import { invalidFirstName } from './employee.validation';
import { invalidDob } from './sample.validation';

declare module 'yup' {
  interface StringSchema {
    invalidFirstName(msg: string): yup.StringSchema;
    invalidDob(msg: string): yup.StringSchema;
  }
}

export const allYupMethods: YupMethodType[] = [
  {
    schemaType: yup.string,
    method: invalidFirstName,
  },
  {
    schemaType: yup.string,
    method: invalidDob,
  },
];

export * from './employee.validation';
export * from './sample.validation';
