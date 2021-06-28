/* eslint-disable @typescript-eslint/ban-types */
import { FieldError, FieldValues } from 'react-hook-form';

/**
 * -----------------------------------------------------------------------------------
 * -----------------------------------------------------------------------------------
 * ----Types for Validation Resolver--------------------------------------------------
 * -----------------------------------------------------------------------------------
 * -----------------------------------------------------------------------------------
 */
export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T;
export type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;
export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type ValidationResult = FieldError | null | undefined | false;
export type ValidatorFn<TFieldValue extends any = any> = (value: TFieldValue) => ValidationResult;
export type ValidatorFnArray<TFieldValues extends FieldValues = FieldValues> = ValidatorFnConfigs<TFieldValues>[];
export type ValidatorFnObject<TFieldValues> = {
  [P in keyof TFieldValues]?: ValidatorFn<TFieldValues[P]>[];
};
export type ValidatorFnAllType<TFieldValues extends FieldValues = FieldValues> =
  | ValidatorFnArray<TFieldValues[string]>
  | ValidatorFnObject<TFieldValues[string]>
  | ValidatorFn<TFieldValues[string]>[];
export type ValidatorFnConfigs<TFieldValues extends FieldValues = FieldValues> = {
  [P in keyof TFieldValues]?: 
    TFieldValues[P] extends (infer R)[] ? ValidatorFnArray<R> : // Is Array
    TFieldValues[P] extends object ? ValidatorFnObject<TFieldValues[P]> : // Is Object
    ValidatorFn<TFieldValues[P]>[]; // Is Fn
};

/**
 * -----------------------------------------------------------------------------------
 * -----------------------------------------------------------------------------------
 * ----Types for Form-----------------------------------------------------------------
 * -----------------------------------------------------------------------------------
 * -----------------------------------------------------------------------------------
 */
export type FieldsBoolean<TFieldValues> = {
  [P in keyof TFieldValues]: boolean;
};
