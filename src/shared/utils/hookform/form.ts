/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-types */
import { get, isEqual, set } from 'lodash';
import { useLayoutEffect, useRef, useState } from 'react';
import {
  useForm as useOriginalForm,
  useFormContext as useOriginalFormContext,
  FieldValues,
  UseFormProps as UseOriginalFormProps,
  UseFormReturn as UseOriginalFormReturn,
  FieldError,
  Resolver,
} from 'react-hook-form';
import { ConfiguredValidatorFn } from './types';
import { forEachFieldElement, getCurrentHTMLElementRef, getFieldsNameFromFieldsRef, isLiveInDOM } from './utils';
import { createValidationContext, ValidationContext, validationResolver } from './validationResolver';

export * from 'react-hook-form';
export interface UseFormReturn<TFieldValues extends FieldValues = FieldValues, TContext extends object = object>
  extends UseOriginalFormReturn<TFieldValues> {
  setValues: (_data: TFieldValues) => void;
  getErrorsMui: (fieldName: string) => { error: boolean; helperText: string };
  setReadOnly: (fieldName: string, value: boolean) => void;
  setDisable: (fieldName: string, value: boolean) => void;
  validationContext: ValidationContext<TFieldValues> | undefined | TContext;
  readonly disabledFields: Record<string, boolean>;
  readonly readOnlyFields: object;
}

export interface UseFormProps<TFieldValues extends FieldValues = FieldValues, TContext extends object = object>
  extends UseOriginalFormProps<TFieldValues, TContext> {
  validators?: ConfiguredValidatorFn<TFieldValues>;
}

export function useForm<TFieldValues extends FieldValues = FieldValues, TContext extends object = object>(
  props: UseFormProps<TFieldValues, TContext>,
): UseFormReturn<TFieldValues, TContext> {
  const { validators, ...originalFormProps } = props;

  /** Public disabled fields and readonly fields */
  const [disabledFields, setDisabledFields] = useState({});
  const [readOnlyFields, setReadOnlyFields] = useState({});
  const [fieldsName, setFieldsName] = useState<string[]>([]);

  /** Save disabled fields, readonly fields and field names in Ref to use for internal handling that aims to prevent re-render */
  const disabledFieldsRef = useRef({});
  const readOnlyFieldsRef = useRef({});
  const fieldsNameRef = useRef([] as string[]);

  const validationContext = createValidationContext<TFieldValues>();

  const formRef = useOriginalForm<TFieldValues, TContext>({
    ...originalFormProps,
    resolver: validators // if validators => init customed resolver <---> if not => using original resolver.
      ? (validationResolver<TFieldValues>(validators, fieldsNameRef, validationContext) as Resolver<
          TFieldValues,
          object
        >)
      : originalFormProps.resolver,
    context: validators ? (validationContext as TContext) : originalFormProps.context,
  }) as UseFormReturn<TFieldValues, TContext>;

  fieldsNameRef.current = fieldsName;
  disabledFieldsRef.current = disabledFields;
  readOnlyFieldsRef.current = readOnlyFields;

  useLayoutEffect(() => {
    const newFieldsName = getFieldsNameFromFieldsRef(formRef.control.fieldsRef);
    const isChanged = !isEqual(newFieldsName, fieldsNameRef.current);
    if (isChanged) {
      setFieldsName(newFieldsName);
    }
  });

  // NOTE: Handle for when field is removed
  useLayoutEffect(() => {
    /**
     * If fieldsName is changed, the hook form will init or load disabled fields or readonly field again so that they can be newest.
     */

    const loadDisabledFieldRef = () => {
      const target = { ...disabledFields };
      for (const fieldName of fieldsNameRef.current) {
        const elementRef = getCurrentHTMLElementRef(formRef.control.fieldsRef, fieldName);
        if (isLiveInDOM(elementRef)) {
          forEachFieldElement(elementRef, (el) => {
            set(target, fieldName, el.disabled);
          });
        }
      }
      setDisabledFields(target);
    };

    const loadReadOnlyFieldRef = () => {
      const target = { ...readOnlyFields };
      for (const fieldName of fieldsNameRef.current) {
        const elementRef = getCurrentHTMLElementRef(formRef.control.fieldsRef, fieldName);
        if (isLiveInDOM(elementRef)) {
          forEachFieldElement(elementRef, (el) => {
            set(target, fieldName, (el as HTMLInputElement | HTMLTextAreaElement).readOnly);
          });
        }
      }
      setReadOnlyFields(target);
    };
    loadDisabledFieldRef();
    loadReadOnlyFieldRef();
  }, [fieldsName]);

  const setValues = (data: TFieldValues) => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formRef.setValue(key as any, data[key]);
      }
    }
  };

  const doSetReadOnly = (fieldName: string, parentElement: HTMLElement, value: boolean) => {
    const target = { ...readOnlyFields };
    forEachFieldElement(parentElement, (element, elementName) => {
      /** Readonly is not applied for select element (HTML5) */
      const isNotSelectElement = elementName !== 'select';
      if (isNotSelectElement) {
        (element as HTMLInputElement | HTMLTextAreaElement).readOnly = value;
      }
      set(target, fieldName, value);
      setReadOnlyFields(target);
    });
  };

  const setReadOnly = (fieldName: string, value: boolean) => {
    const ref: HTMLElement = getCurrentHTMLElementRef(formRef.control.fieldsRef, fieldName);

    if (!ref) return;

    doSetReadOnly(fieldName, ref, value);
  };

  const doSetDisabled = (fieldName: string, parentElement: HTMLElement, value: boolean) => {
    const target = { ...disabledFields };
    forEachFieldElement(parentElement, (element) => {
      element.disabled = value;
      set(target, fieldName, value);
      setDisabledFields(target);
    });
  };

  const setDisable = (fieldName: string, value: boolean) => {
    const ref: HTMLElement = getCurrentHTMLElementRef(formRef.control.fieldsRef, fieldName);

    if (!ref) return;

    doSetDisabled(fieldName, ref, value);
  };

  const getErrorsMui = (fieldName: string) => {
    const currentError = get(formRef.formState.errors, fieldName) as FieldError;
    return {
      error: !!currentError,
      helperText: currentError?.message ?? '',
    };
  };

  return {
    ...formRef,
    validationContext,
    setValues,
    setReadOnly,
    setDisable,
    getErrorsMui,
    disabledFields,
    readOnlyFields,
  };
}

export const useFormContext = <TFieldValues extends FieldValues>(): UseFormReturn<TFieldValues> => {
  return useOriginalFormContext() as UseFormReturn<TFieldValues>;
};
