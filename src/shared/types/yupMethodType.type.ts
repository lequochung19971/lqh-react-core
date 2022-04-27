import * as yup from 'yup';

type SchemaTypes = (...arg: any[]) => yup.AnySchema;

type CustommedAnySchema = any;
export interface YupMethodType {
  schemaType: SchemaTypes;
  method: (this: CustommedAnySchema, ...args: any[]) => CustommedAnySchema;
}
