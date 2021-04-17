import * as yup from 'yup';

export function invalidDob(this: yup.StringSchema, msg: string): yup.StringSchema {
  return this.test({
    name: 'invalidDob',
    message: msg,
    test: (value) => {
      console.log(value);
      return true;
    },
  });
}