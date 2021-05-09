import * as yup from 'yup';

export function invalidFirstName(this: yup.StringSchema, msg: string): yup.StringSchema {
  return this.test({
    name: 'Invalid FirstName',
    message: msg,
    test: (value) => {
      console.log(value);
      return false;
    },
  });
}