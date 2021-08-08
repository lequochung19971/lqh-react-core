import * as yup from 'yup';

type SchemaTypes = (...arg: any[]) => yup.AnySchema;

type CustomedAnySchema = any;
export interface YupMethodType {
  schemaType: SchemaTypes;
  method: (this: CustomedAnySchema, ...args: any[]) => CustomedAnySchema;
}
