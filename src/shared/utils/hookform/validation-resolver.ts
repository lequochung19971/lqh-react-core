/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { get, has, isEmpty, set } from 'lodash';
import { useMemo, useRef } from 'react';
import { Resolver, FieldError as YupFieldError, DeepMap } from 'react-hook-form';

type DeepReadonly<T> =
    T extends (infer R)[] ? DeepReadonlyArray<R> :
    T extends Function ? T :
    T extends object ? DeepReadonlyObject<T> :
    T;
type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;
type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type FormValueType = Record<string, any>;
export type ValidatorFn<TFieldValue extends any = any> = (value: TFieldValue) => ValidationResult;
export type ValidationResult = YupFieldError | null | undefined | false;
export type ValidatorFnConfigs<TFormValue extends FormValueType = FormValueType> = {
  [P in keyof TFormValue]?: ValidatorFn<TFormValue[P]>[];
};

export class ValidationContext<TFormValue> {
  public validators: ValidatorFnConfigs<TFormValue> = {};

  public getValidator<TFieldValue extends any = any>(path: string): ValidatorFn<TFieldValue>[] {
    return get(this.validators, path);
  }

  public setValidators<TFieldValue extends any = any>(path: string, newValidator: ValidatorFn<TFieldValue>[] | ValidatorFn<TFieldValue>): void {
    const currentValidators = get(this.validators, path) ?? [];

    const removeDuplicate = (currentV: ValidatorFn<TFieldValue>[], newV: ValidatorFn<TFieldValue>[]): ValidatorFn<TFieldValue>[] => {
      const setRef = new Set([...currentV, ...newV])
      return [...setRef];
    }

    if(Array.isArray(newValidator)) {
      const removedDuplicateValidators = removeDuplicate(currentValidators, newValidator);
      set(this.validators, path, removedDuplicateValidators);
    } else {
      const removedDuplicateValidators = removeDuplicate(currentValidators, [newValidator]);
      set(this.validators, path, removedDuplicateValidators);
    }
  }

  public clearValidators(path: string): void {
    set(this.validators, path, []);
  }
}

export class ValidationResolverRef<TFormValue extends FormValueType = FormValueType> {
  public formValue: TFormValue;
  public flattenedObjectKeys: string[];
  public validators: ValidatorFnConfigs<TFormValue>;

  constructor(props: ValidationResolverRef<TFormValue>) {
    this.formValue = props.formValue;
    this.flattenedObjectKeys = props.flattenedObjectKeys;
    this.validators = props.validators;
  }
};

export class FieldError {
  type: string;
  message: string;
  constructor(type: string, message: string) {
    this.type = type;
    this.message = message;
  }
}

export class ValidationModel<TFormValue extends FormValueType = FormValueType> {
  private readonly _formValue: DeepReadonly<TFormValue>;
  private _path;
  readonly value;

  constructor(ref: { current: ValidationResolverRef<TFormValue> }, path: string, value: FormValueType) {
    this._formValue = Object.freeze(ref.current.formValue) as DeepReadonly<TFormValue>;
    this._path = path;
    this.value = value;
  }

  get formValue(): DeepReadonly<TFormValue> {
    return this._formValue;
  }

  get parent(): DeepReadonly<any> {
    const splitedPath = this._path.split('.');
    const { length } = splitedPath;
    const parentPath = splitedPath.slice(0, length - 1);
    return get(this._formValue, parentPath);
  }

  createError({type, message}: FieldError): FieldError {
    return new FieldError(type, message);
  }
}

/**
* Function that creates a memorized validation context for context property in useForm (React Hook Form).
* @author   hungle
* @returns  {ValidationContext<TFormValue>}  memorized validation context
*/
export const createValidationContext = <TFormValue>(): ValidationContext<TFormValue> => {
  return useMemo(() => new ValidationContext<TFormValue>(), []);
}

/**
* Function that implements to flatten object by recursion.
* @author   hungle
* @param    {any}  currentNode  Current Object
* @param    {string[]}  target  Flattened Result
* @param    {string | undefined}  flattenedKey  Flattened Key
*/
const traverseAndFlatten = (currentNode: any, target: string[], flattenedKey?: string | undefined) => {
  for (const key in currentNode) {
    if (currentNode.hasOwnProperty(key)) {
      let newKey;
      if (flattenedKey === undefined) {
        newKey = key;
      } else {
        newKey = flattenedKey + '.' + key;
      }

      const value = currentNode[key];
      if (typeof value === 'object') {
        traverseAndFlatten(value, target, newKey);
      } else {
        target.push(newKey);
      }
    }
  }
};

/**
* Function that flatten object.
* @author   hungle
* @param    {unknown}  obj  Object
* @returns  {string[]}  Object keys
*/
const flattenObj = (obj: unknown): string[] => {
  const flattenedObject: string[] = [];
  traverseAndFlatten(obj, flattenedObject);
  return flattenedObject;
};

/**
* Function that generates path to get configured validator functions.
* @author   hungle
* @param    {string[]}  paths  Flattened object keys
* @returns  {string}  Path of configured validation function
*/
const generateValidatorPath = (path: string): string => {
  const regex1 = /([\.\[]+)(\b[0-9]{1,61})([\]\.]+)/g; //.[number].
  const regex2 = /(\.[0-9]+)$/g; //.[number]
  const regex3 = /\.+$/g; //remove '.' at the end of path

  let validatorPath = path.replace(regex1, '.0.');
  validatorPath = validatorPath.replace(regex2, '.0');
  validatorPath = validatorPath.replace(regex3, '');
  return validatorPath;
};

/**
* Function that runs validator functions when any fields or form are detected change.
* @author   hungle
* @param    {{ current: ValidationResolverRef<TFormValue> }}  ref  A Relsover Reference to save necessary informations for handling during a form process
* @param    {string[]}  paths  Flattened object keys
* @param    errros  Errors
*/
const runValidators = <TFormValue>(
  ref: { current: ValidationResolverRef<TFormValue> },
  paths: string[],
  errros = {},
) => {
  for (const path of paths) {
    const currentValue: TFormValue = get(ref.current.formValue, path);
    type TNewValue = typeof currentValue;

    const currentValidator: ValidatorFn<TNewValue>[] = get(ref.current.validators, path);
    const isObject = typeof currentValue === 'object';

    if (isObject) {
      const nextValues = set({}, path, currentValue);
      const flattenedKeys = flattenObj(nextValues);
      runValidators<TNewValue>(ref, flattenedKeys, errros);
    } else {
      const resolverRef = new ValidationModel<TFormValue>(ref, path, currentValue);
      for (const fn of currentValidator) {
        const valueValidation = fn.call(resolverRef, currentValue);
        if (valueValidation && valueValidation.hasOwnProperty('type')) {
          set(errros, path, valueValidation);
          break;
        }
      }
    }
  }
};

/**
* Function that creates a validator function with "this"
* @author   hungle
* @param    {(this: ValidationModel<TFormValue>, value: TFieldValue) => ValidationResult}  fn  A Validator Function (Only Normal Function)
* @return   {(value: TFieldValue) => ValidationResult} A Validator Function
*/
export function createValidator<TFormValue extends FormValueType = FormValueType, TFieldValue = any>(
  fn: (this: ValidationModel<TFormValue>, value: TFieldValue) => ValidationResult,
): (value: TFieldValue) => ValidationResult {
  return fn;
}

/**
* Function that creates and check A Validation Form to pass into "validationResolver" function
* @author   hungle
* @param    {ValidatorFnConfigs<TFormValue>}  validatorFnConfigs  Configured Validator Functions
* @return   {ValidatorFnConfigs<TFormValue>} Configured Validator Functions
*/
export const createValidationForm = <TFormValue extends FormValueType = FormValueType>(validatorFnConfigs: ValidatorFnConfigs<TFormValue>): ValidatorFnConfigs<TFormValue> => {
  return validatorFnConfigs;
}

/**
* Function that init resolver references
* @author   hungle
* @param    {string[]}  paths  Flattened object keys
* @param    {TFormValue}  formValue  Form value
* @param    {ValidatorFnConfigs}  configedValidators  Configured validation functions
* @param    {ValidatorFnConfigs<TFormValue>}  target  Validator functions for handling
*/
const initValidators = <TFormValue extends FormValueType = FormValueType>(
  paths: string[],
  formValue: TFormValue,
  configedValidators: ValidatorFnConfigs,
  target: ValidatorFnConfigs<TFormValue> = {},
) => {
  for (const path of paths) {
    const currentValue = get(formValue, path);
    const isNotObject = typeof currentValue !== 'object';

    if (isNotObject) {
      const configedValidatorPath = generateValidatorPath(path);
      const hasConfigedValidators = has(configedValidators, configedValidatorPath) && !!get(configedValidators, configedValidatorPath)?.length;

      const currentValidators = get(target, path) ?? [];
      const isNotGenerated = !has(target, path) || !currentValidators.length;

      if (isNotGenerated && hasConfigedValidators) {
        const newValidators = get(configedValidators, configedValidatorPath);
        set(target, path, newValidators);
      } else {
        const newValidators = get(configedValidators, configedValidatorPath);
        const mergedValidators = [...(currentValidators ?? []), ...(newValidators ?? [])];
        const removedDuplicateValidators = new Set(mergedValidators);
        set(target, path, [...removedDuplicateValidators]);
      }
    }
  }
  return target;
};

/**
* Function that init resolver references
* @author   hungle
* @param    {{ current: ValidationResolverRef<TFormValue> }}  ref  A Relsover Reference to save necessary informations for handling during a form process
* @param    {TFormValue}  formValue   Form value
* @param    {ValidatorFnConfigs<TFormValue>}  configedValidators   Configured validation functions
*/
const initValidationResolverRef = <TFormValue>(
  ref: { current: ValidationResolverRef<TFormValue> },
  formValue: TFormValue,
  configedValidators: ValidatorFnConfigs<TFormValue>,
) => {
  const flattenedObjectKeys = flattenObj(formValue);
  ref.current.formValue = formValue;

  if (ref.current.flattenedObjectKeys.length !== flattenedObjectKeys.length) {
    ref.current.flattenedObjectKeys = flattenedObjectKeys;
    ref.current.validators = initValidators(
      flattenedObjectKeys,
      ref.current.formValue,
      configedValidators,
      ref.current.validators,
    );
  }
};


/**
* Function that generates a Validation Resolver for React Hook Form
* @author   hungle
* @param    {ValidatorFnConfigs<TFormValue>}  validators  Configured Validator Functions
* @return   {Resolver<TFormValue, ValidationContext<TFormValue>>} Resolver of a Hook Form
*/
export const validationResolver = <TFormValue extends FormValueType = FormValueType> (
  validators: ValidatorFnConfigs<TFormValue>,
): Resolver<TFormValue, ValidationContext<TFormValue>> => {

  const ref = useRef(new ValidationResolverRef<TFormValue>({
    formValue: {} as TFormValue,
    flattenedObjectKeys: [] as string[],
    validators: {} as ValidatorFnConfigs<TFormValue>,
  }));

  const resolver: Resolver<TFormValue, ValidationContext<TFormValue>> = (values, context, options) => {
    if (context instanceof ValidationContext && !(context.validators === ref.current.validators)) {
      if (isEmpty(context.validators)) {
        context.validators = ref.current.validators;
      } else {
        ref.current.validators = context.validators;
      }
    }

    initValidationResolverRef<TFormValue>(ref, values as TFormValue, validators);

    const errors: DeepMap<TFormValue, FieldError> = {};

    if (options.names) {
      runValidators<TFormValue>(ref, options.names, errors);
    } else {
      runValidators<TFormValue>(ref, ref.current.flattenedObjectKeys, errors);
    }

    return { values, errors };
  };

  return resolver;
};
