/* eslint-disable react-hooks/rules-of-hooks */
import { get, isEqual, set } from 'lodash';
import { useMemo, useRef } from 'react';
import { Resolver, FieldError, DeepMap, FieldValues } from 'react-hook-form';
import { DeepReadonly, ValidationResult, ValidatorFn, ValidatorFnAllType, ConfiguredValidatorFn } from './types';
import { clearObjectKeepReference, flattenObject } from './utils';

/**
 * ValidationContext saves the validation infos that to public for component.
 * And provides utilities (getValidator, setValidators, ...) for interaction with the validationContext of hookform.
 */
export class ValidationContext<TFieldValues> {
  public validators: ConfiguredValidatorFn<TFieldValues> = {};

  public getValidator<TFieldValue extends any = any>(path: string): ValidatorFn<TFieldValue>[] {
    return get(this.validators, path);
  }

  //TODO: Enhancement
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
  public fieldsName: string[];
  public validators: ConfiguredValidatorFn<TFieldValues>;

  constructor(props: ValidationResolverRef<TFieldValues>) {
    this.formValue = props.formValue;
    this.fieldsName = props.fieldsName;
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
 * @desc Function that creates a memorized validation context for context property in useForm (React Hook Form)
 * so that the hookform can make it public to use methods in ValidationContext class (setValidators, getValidators, ...)
 * @author   hungle
 * @returns  {ValidationContext<TFieldValues>}  memorized validation context
 */
export const createValidationContext = <TFieldValues>(): ValidationContext<TFieldValues> => {
  return useMemo(() => new ValidationContext<TFieldValues>(), []);
};

/**
 * @desc
 * - Function that generates path to get configured validator functions (ConfiguredValidatorFn).
 * And this function focus for generating paths if field is in an Array.
 * - For example:
 *    * If field is in Array
 *      + field-path: array[1].values[9]
 *      + configured-validator-path: array[0].values[0] (always configure with index (0))
 *      + This function will convert from field-path to configured-validator-path
 *      so that the loadValidators function can get configured validator functions
 *    * If field is normal
 *      + field-path: user.firstName
 *      + configured-validator-path: user.firstName
 * @author   hungle
 * @param    {string[]}  paths  Flattened object keys
 * @returns  {string}  Path of configured validation function
 */
const generateValidatorPath = (path: string): string => {
  /** - Format: .[number]. */
  const regex1 = /([\.\[]+)(\b[0-9]{1,61})([\]\.]+)/g;
  /** - Format: .[number] */
  const regex2 = /(\.[0-9]+)$/g;
  /** - Remove '.' at the end of path */
  const regex3 = /\.+$/g;

  let validatorPath = path.replace(regex1, '.0.');
  validatorPath = validatorPath.replace(regex2, '.0');
  validatorPath = validatorPath.replace(regex3, '');
  return validatorPath;
};
/**
 * @desc  Function that do validate and save returned error in the errors list.
 * If an error is returned, the process of validating is stopped.
 * @author  hungle
 * @param {React.MutableRefObject<ValidationResolverRef<TFieldValues>>}  ref
 * A Relsover Reference to save necessary informations for handling during a form process
 * @param {string} path path of current field that is saved in fieldsName
 * @param {TFieldValues} currentValue value of the current field
 * @param {ValidatorFn<TFieldValues>[]} currentValidators validators of the current field
 * @param {object} errors An object to save errors
 */
const doValidateAndSaveError = <TFieldValues>(
  ref: React.MutableRefObject<ValidationResolverRef<TFieldValues>>,
  path: string,
  currentValue: TFieldValues,
  currentValidators: ValidatorFn<TFieldValues>[],
  errors: object,
) => {
  const resolverRef = new ValidatorModel<TFieldValues>(ref, path, currentValue);
  for (const fn of currentValidators) {
    const validationResult = fn.call(resolverRef, currentValue);

    /** If the validation result has an error, it will stop validate. */
    const hasError = validationResult && validationResult.hasOwnProperty('type');
    if (hasError) {
      set(errors, path, validationResult);
      break;
    }
  }
};

/**
 * @desc Function that runs validator functions when any fields or form are detected change.
 * @author   hungle
 * @param    {React.MutableRefObject<ValidationResolverRef<TFieldValues>>}  ref
 * A Relsover Reference to save necessary informations for handling during a form process
 * @param    {string[]}  paths  Flattened object keys
 * @param    errors  Errors
 */
const executeValidators = <TFieldValues>(
  ref: React.MutableRefObject<ValidationResolverRef<TFieldValues>>,
  paths: string[],
  errors = {},
) => {
  for (const path of paths) {
    const currentValue: TFieldValues = get(ref.current.formValue, path);
    type TNewValue = typeof currentValue;

    const currentValidators: ValidatorFn<TNewValue>[] = get(ref.current.validators, path);

    const haveNoValidators = !currentValidators?.length;
    if (haveNoValidators) break;

    const isObject = typeof currentValue === 'object';

    /** if value of the current field is object, it will go deep inside for execution */
    if (isObject) {
      const nextValues = set({}, path, currentValue);
      const flattenedKeys = flattenObject(nextValues);
      executeValidators<TNewValue>(ref, flattenedKeys, errors);
    } else {
      doValidateAndSaveError(ref, path, currentValue, currentValidators, errors);
    }
  }
};

/**
 * @desc Function that creates a validator function with "this"
 * @note Using normal function so that you can use this (ValidatorModel) in validator function
 * @author   hungle
 * @param    {(this: ValidatorModel<TFieldValues>, value: TFieldValue) => ValidationResult}  fn  A Validator Function (Only Normal Function)
 * @returns   {(value: TFieldValue) => ValidationResult} A Validator Function
 */
export function createValidator<TFieldValues extends FieldValues = FieldValues, TFieldValue = string>(
  fn: (this: ValidatorModel<TFieldValues>, value: TFieldValue) => ValidationResult,
): (value: TFieldValue) => ValidationResult {
  return fn;
}

/**
 * @desc Function that creates and validate A Validation Form to pass into "validationResolver" function
 * @author   hungle
 * @param    {ConfiguredValidatorFn<TFieldValues>}  configuredValidatorFns  Configured Validator Functions
 * @returns   {ConfiguredValidatorFn<TFieldValues>} Configured Validator Functions
 */
export const createValidationForm = <TFieldValues extends FieldValues = FieldValues>(
  configuredValidatorFns: ConfiguredValidatorFn<TFieldValues>,
): ConfiguredValidatorFn<TFieldValues> => {
  return configuredValidatorFns;
};

/**
 * @desc Function that load resolver references
 * @author   hungle
 * @param    {string[]}  paths  Flattened object keys
 * @param    {TFieldValues}  formValue  Form value
 * @param    {ConfiguredValidatorFn}  configuredValidators  Configured validation functions
 * @param    {ConfiguredValidatorFn<TFieldValues>}  target  Validator functions for handling
 */
const loadValidators = <TFieldValues extends FieldValues = FieldValues>(
  paths: string[],
  formValue: TFieldValues,
  configuredValidators: ConfiguredValidatorFn<TFieldValues>,
  target: ConfiguredValidatorFn<TFieldValues> = {},
) => {
  clearObjectKeepReference(target);

  for (const path of paths) {
    const currenFieldValue = get(formValue, path);

    /**
     * - Don't accept the currenFieldValue type is object because
     * the validationResolver method currently doesn't support for a field value is a object value.
     * - Will update in the future (if any)
     */
    const isNotObject = typeof currenFieldValue !== 'object';

    if (isNotObject) {
      const currentValidators = get(target, path) as ValidatorFnAllType<TFieldValues>;
      const haveNoCurrentValidators = !currentValidators?.length;

      /** If the current field don't have any validator, it will be loaded */
      if (haveNoCurrentValidators) {
        const configuredValidatorPath = generateValidatorPath(path);
        const newValidators: ValidatorFnAllType<TFieldValues> = get(
          configuredValidators,
          configuredValidatorPath,
        ) as ValidatorFnAllType<TFieldValues>;

        const hasConfiguredValidatorFns = !!newValidators?.length;

        if (hasConfiguredValidatorFns) {
          set(target, path, newValidators);
        }
      }
    }
  }
  return target;
};

/**
 * @desc Function that load resolver references
 * @author   hungle
 * @param    {React.MutableRefObject<ValidationResolverRef<TFieldValues>>}  ref  A Relsover Reference to save necessary informations for handling during a form process
 * @param    {TFieldValues}  formValue   Form value
 * @param    {ConfiguredValidatorFn<TFieldValues>}  configuredValidatorFns   Configured validation functions
 * @param    {string[]}  fieldsName   Name of fields in hook form
 */
const loadValidationResolverRef = <TFieldValues>(
  ref: React.MutableRefObject<ValidationResolverRef<TFieldValues>>,
  formValue: TFieldValues,
  configuredValidatorFns: ConfiguredValidatorFn<TFieldValues>,
  fieldsName: string[],
) => {
  ref.current.formValue = formValue;
  const isFieldsRefChanged = !isEqual(fieldsName, ref.current.fieldsName);

  /** If fields (fieldsName) are changed or not loaded, validators of fields will be loaded. */
  if (isFieldsRefChanged) {
    ref.current.fieldsName = fieldsName;
    ref.current.validators = loadValidators<TFieldValues>(
      ref.current.fieldsName,
      ref.current.formValue,
      configuredValidatorFns,
      ref.current.validators,
    );
  }
};

/**
 * @desc Function that load validation context
 * @author   hungle
 * @param    {React.MutableRefObject<ValidationResolverRef<TFieldValues>>}  ref  A Relsover Reference to save necessary informations for handling during a form process
 * @param    {ValidationContext<TFieldValues> | undefined}  context   Validation context
 */
const loadValidationContext = <TFieldValues>(
  ref: React.MutableRefObject<ValidationResolverRef<TFieldValues>>,
  context: ValidationContext<TFieldValues> | undefined,
) => {
  if (context instanceof ValidationContext && context.validators !== ref.current.validators) {
    context.validators = ref.current.validators;
  }
};

/**
 * @desc Function that generates a Validation Resolver for React Hook Form
 * @note This function doesn't not support for a field value as object value.
 * @author   hungle
 * @param    {ConfiguredValidatorFn<TFieldValues>}  configuredValidatorFns  Configured Validator Functions
 * @returns   {Resolver<TFieldValues, ValidationContext<TFieldValues>>} Resolver of a Hook Form
 */
export const validationResolver = <TFieldValues extends FieldValues = FieldValues>(
  configuredValidatorFns: ConfiguredValidatorFn<TFieldValues>,
  fieldsNameRef: React.MutableRefObject<string[]>,
  validationContext: ValidationContext<TFieldValues>,
): Resolver<TFieldValues, ValidationContext<TFieldValues>> => {
  const ref = useRef(
    new ValidationResolverRef<TFieldValues>({
      formValue: {} as TFieldValues,
      fieldsName: [] as string[],
      validators: {} as ConfiguredValidatorFn<TFieldValues>,
    }),
  );

  /**
   * Check if fieldsNameRef is existed, validationResolver function will load
   * validationContext and validationResolverRef first before resolver is executed
   */
  const hasFieldsName = fieldsNameRef.current.length;
  if (hasFieldsName) {
    loadValidationContext(ref, validationContext);
    loadValidationResolverRef<TFieldValues>(
      ref,
      ref.current.formValue as TFieldValues,
      configuredValidatorFns,
      fieldsNameRef.current,
    );
  }

  const resolver: Resolver<TFieldValues, ValidationContext<TFieldValues>> = (values, context, options) => {
    /** Loading validationContext and validationResolverRef throughout the execution of hookform. */
    loadValidationContext(ref, context);
    loadValidationResolverRef<TFieldValues>(ref, values as TFieldValues, configuredValidatorFns, fieldsNameRef.current);

    const errors: DeepMap<TFieldValues, FieldError> = {};

    if (options.names) {
      // Execute for only 1 field
      executeValidators<TFieldValues>(ref, options.names, errors);
    } else {
      // Execute for many fields
      executeValidators<TFieldValues>(ref, ref.current.fieldsName, errors);
    }

    return { values, errors };
  };

  return resolver;
};
