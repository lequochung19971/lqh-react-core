/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { difference, get, has, set } from 'lodash';
import { useMemo, useRef } from 'react';
import { Resolver, FieldError, DeepMap, FieldValues } from 'react-hook-form';
import { DeepReadonly, ValidationResult, ValidatorFn, ValidatorFnAllType, ValidatorFnConfigs } from './types';
import { clearObjectKeepReference, flattenObj } from './utils';

export class ValidationContext<TFieldValues> {
  public validators: ValidatorFnConfigs<TFieldValues> = {};

  public getValidator<TFieldValue extends any = any>(path: string): ValidatorFn<TFieldValue>[] {
    return get(this.validators, path);
  }

  public setValidators<TFieldValue extends any = any>(
    path: string,
    newValidator: ValidatorFn<TFieldValue>[] | ValidatorFn<TFieldValue>,
  ): void {
    const currentValidators = get(this.validators, path) ?? [];

    const removeDuplicate = (
      currentV: ValidatorFn<TFieldValue>[],
      newV: ValidatorFn<TFieldValue>[],
    ): ValidatorFn<TFieldValue>[] => {
      const setRef = new Set([...currentV, ...newV]);
      return [...setRef];
    };

    if (Array.isArray(newValidator)) {
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

export class ValidationResolverRef<TFieldValues extends FieldValues = FieldValues> {
  public formValue: TFieldValues;
  public fieldNames: string[];
  public validators: ValidatorFnConfigs<TFieldValues>;

  constructor(props: ValidationResolverRef<TFieldValues>) {
    this.formValue = props.formValue;
    this.fieldNames = props.fieldNames;
    this.validators = props.validators;
  }
}

export class ValidatorModel<TFieldValues extends FieldValues = FieldValues> {
  private readonly _formValue: DeepReadonly<TFieldValues>;
  private _path;
  readonly value;

  constructor(ref: React.MutableRefObject<ValidationResolverRef<TFieldValues>>, path: string, value: FieldValues) {
    this._formValue = Object.freeze(ref.current.formValue) as DeepReadonly<TFieldValues>;
    this._path = path;
    this.value = value;
  }

  get formValue(): DeepReadonly<TFieldValues> {
    return this._formValue;
  }

  get parent(): DeepReadonly<any> {
    const splitedPath = this._path.split('.');
    const { length } = splitedPath;
    const parentPath = splitedPath.slice(0, length - 1);
    return get(this._formValue, parentPath);
  }

  createError({ type, message }: FieldError): FieldError {
    return { type, message };
  }
}

/**
 * Function that creates a memorized validation context for context property in useForm (React Hook Form).
 * @author   hungle
 * @returns  {ValidationContext<TFieldValues>}  memorized validation context
 */
export const createValidationContext = <TFieldValues>(): ValidationContext<TFieldValues> => {
  return useMemo(() => new ValidationContext<TFieldValues>(), []);
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
 * @param    {React.MutableRefObject<ValidationResolverRef<TFieldValues>>}  ref  A Relsover Reference to save necessary informations for handling during a form process
 * @param    {string[]}  paths  Flattened object keys
 * @param    errros  Errors
 */
const executeValidators = <TFieldValues>(
  ref: React.MutableRefObject<ValidationResolverRef<TFieldValues>>,
  paths: string[],
  errros = {},
) => {
  for (const path of paths) {
    const currentValue: TFieldValues = get(ref.current.formValue, path);
    type TNewValue = typeof currentValue;

    const currentValidator: ValidatorFn<TNewValue>[] = get(ref.current.validators, path);
    if (!currentValidator?.length) break;

    const isObject = typeof currentValue === 'object';

    if (isObject) {
      const nextValues = set({}, path, currentValue);
      const flattenedKeys = flattenObj(nextValues);
      executeValidators<TNewValue>(ref, flattenedKeys, errros);
    } else {
      const resolverRef = new ValidatorModel<TFieldValues>(ref, path, currentValue);
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
 * @param    {(this: ValidatorModel<TFieldValues>, value: TFieldValue) => ValidationResult}  fn  A Validator Function (Only Normal Function)
 * @return   {(value: TFieldValue) => ValidationResult} A Validator Function
 */
export function createValidator<TFieldValues extends FieldValues = FieldValues, TFieldValue = any>(
  fn: (this: ValidatorModel<TFieldValues>, value: TFieldValue) => ValidationResult,
): (value: TFieldValue) => ValidationResult {
  return fn;
}

/**
 * Function that creates and validate A Validation Form to pass into "validationResolver" function
 * @author   hungle
 * @param    {ValidatorFnConfigs<TFieldValues>}  validatorFnConfigs  Configured Validator Functions
 * @return   {ValidatorFnConfigs<TFieldValues>} Configured Validator Functions
 */
export const createValidationForm = <TFieldValues extends FieldValues = FieldValues>(
  validatorFnConfigs: ValidatorFnConfigs<TFieldValues>,
): ValidatorFnConfigs<TFieldValues> => {
  return validatorFnConfigs;
};

/**
 * Function that load resolver references
 * @author   hungle
 * @param    {string[]}  paths  Flattened object keys
 * @param    {TFieldValues}  formValue  Form value
 * @param    {ValidatorFnConfigs}  configedValidators  Configured validation functions
 * @param    {ValidatorFnConfigs<TFieldValues>}  target  Validator functions for handling
 */
const loadValidators = <TFieldValues extends FieldValues = FieldValues>(
  paths: string[],
  formValue: TFieldValues,
  configedValidators: ValidatorFnConfigs<TFieldValues>,
  target: ValidatorFnConfigs<TFieldValues> = {},
) => {
  clearObjectKeepReference(target);
  for (const path of paths) {
    const currenTFieldValues = get(formValue, path);
    const isNotObject = typeof currenTFieldValues !== 'object';

    if (isNotObject) {
      // New validators
      const configedValidatorPath = generateValidatorPath(path);
      const newValidators: ValidatorFnAllType<TFieldValues> = get(
        configedValidators,
        configedValidatorPath,
      ) as ValidatorFnAllType<TFieldValues>;
      const hasConfigedValidators = has(configedValidators, configedValidatorPath) && !!newValidators?.length;

      const currentValidators: ValidatorFnAllType<TFieldValues> =
        get(target, path) ?? ([] as ValidatorFnAllType<TFieldValues>);

      if (Array.isArray(newValidators) && Array.isArray(currentValidators)) {
        if (hasConfigedValidators) {
          set(target, path, newValidators);
        }
      }
    }
  }
  return target;
};

/**
 * Function that load resolver references
 * @author   hungle
 * @param    {React.MutableRefObject<ValidationResolverRef<TFieldValues>>}  ref  A Relsover Reference to save necessary informations for handling during a form process
 * @param    {TFieldValues}  formValue   Form value
 * @param    {ValidatorFnConfigs<TFieldValues>}  validatorFnConfigs   Configured validation functions
 * @param    {string[]}  fieldNames   Name of fields in hook form
 */
const loadValidationResolverRef = <TFieldValues>(
  ref: React.MutableRefObject<ValidationResolverRef<TFieldValues>>,
  formValue: TFieldValues,
  validatorFnConfigs: ValidatorFnConfigs<TFieldValues>,
  fieldNames: string[],
) => {
  ref.current.formValue = formValue;
  const diff1 = difference(fieldNames, ref.current.fieldNames);
  const diff2 = difference(ref.current.fieldNames, fieldNames);
  if (diff1.length || diff2.length) {
    ref.current.fieldNames = fieldNames;
    ref.current.validators = loadValidators<TFieldValues>(
      ref.current.fieldNames,
      ref.current.formValue,
      validatorFnConfigs,
      ref.current.validators,
    );
  }
};

/**
 * Function that load validation context
 * @author   hungle
 * @param    {React.MutableRefObject<ValidationResolverRef<TFieldValues>>}  ref  A Relsover Reference to save necessary informations for handling during a form process
 * @param    {ValidationContext<TFieldValues> | undefined}  context   Validation context
 */
const loadValidationContext = <TFieldValues>(
  ref: React.MutableRefObject<ValidationResolverRef<TFieldValues>>,
  context: ValidationContext<TFieldValues> | undefined,
) => {
  if (context instanceof ValidationContext && !(context.validators === ref.current.validators)) {
    context.validators = ref.current.validators;
  }
};

/**
 * Function that generates a Validation Resolver for React Hook Form
 * @author   hungle
 * @param    {ValidatorFnConfigs<TFieldValues>}  validatorFnConfigs  Configured Validator Functions
 * @return   {Resolver<TFieldValues, ValidationContext<TFieldValues>>} Resolver of a Hook Form
 */
export const validationResolver = <TFieldValues extends FieldValues = FieldValues>(
  validatorFnConfigs: ValidatorFnConfigs<TFieldValues>,
  fieldNames: React.MutableRefObject<string[]>,
  validationContext: ValidationContext<TFieldValues>,
): Resolver<TFieldValues, ValidationContext<TFieldValues>> => {
  const ref = useRef(
    new ValidationResolverRef<TFieldValues>({
      formValue: {} as TFieldValues,
      fieldNames: [] as string[],
      validators: {} as ValidatorFnConfigs<TFieldValues>,
    }),
  );

  if (fieldNames.current.length) {
    loadValidationContext(ref, validationContext);
    loadValidationResolverRef<TFieldValues>(
      ref,
      ref.current.formValue as TFieldValues,
      validatorFnConfigs,
      fieldNames.current,
    );
  }

  const resolver: Resolver<TFieldValues, ValidationContext<TFieldValues>> = (values, context, options) => {
    loadValidationContext(ref, context);
    loadValidationResolverRef<TFieldValues>(ref, values as TFieldValues, validatorFnConfigs, fieldNames.current);

    const errors: DeepMap<TFieldValues, FieldError> = {};

    if (options.names) {
      // Execute for only 1 field
      executeValidators<TFieldValues>(ref, options.names, errors);
    } else {
      // Execute for many fields
      executeValidators<TFieldValues>(ref, ref.current.fieldNames, errors);
    }

    return { values, errors };
  };

  return resolver;
};
