/* eslint-disable @typescript-eslint/ban-types */
import { get } from 'lodash';
import { useMemo } from 'react';
import {
  useForm as useOriginalForm,
  useFormContext as useOriginalFormContext,
  FieldValues,
  UseFormProps,
  UseFormReturn,
  FieldError,
} from 'react-hook-form';

export * from 'react-hook-form'

interface UseAppFormReturn<TFieldValues extends FieldValues = FieldValues, TContext extends object = object> extends UseFormReturn<TFieldValues> {
  setValues: (data: TFieldValues) => void;
  getErrorsMui: (fieldName: string) => { error: boolean, helperText: string }
  setReadOnly: (fieldName: string, value: boolean) => void;
  setDisable: (fieldName: string, value: boolean) => void;
  validationContext: TContext | undefined;
}

export function useForm<TFieldValues extends FieldValues = FieldValues, TContext extends object = object>(
  props?: UseFormProps<TFieldValues, TContext>,
): UseAppFormReturn<TFieldValues, TContext> {
  const formRef = useOriginalForm<TFieldValues, TContext>(props);

  const validationContext: TContext | undefined = useMemo(() => props?.context, [props?.context]);

  const setValues = (data: TFieldValues) => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formRef.setValue(key as any, data[key]);
      }
    }
  };

  const getErrorsMui = (fieldName: string) => {
    const currentError = get(formRef.formState.errors, fieldName) as FieldError;
    return {
      error: !!currentError,
      helperText: currentError?.message ?? ''
    }
  }

  const getCurrentHTMLElementRef = (fieldName: string): HTMLElement => {
    const { fieldsRef } = formRef.control;
    const pathRef = `${fieldName}._f.ref`
    const ref: HTMLElement = get(fieldsRef.current, pathRef) as unknown as HTMLElement;
    return ref;
  }

  const markReadOnly = (ref: HTMLElement, value: boolean) => {
    type HTMLElementName = 'input' | 'textarea';
    const htmlElements: HTMLElementName[] = ['input', 'textarea'];

    for (const element of htmlElements) {
      const eleRef = ref.querySelector(element);
      if (eleRef) {
        eleRef.readOnly = value;
      }
    }
  }

  const setReadOnly = (fieldName: string, value: boolean) => {
    const ref: HTMLElement = getCurrentHTMLElementRef(fieldName);

    if (!ref) return;

    markReadOnly(ref, value);
  }

  const markDisabled = (ref: HTMLElement, value: boolean) => {
    type HTMLElementName = 'input' | 'textarea';
    const htmlElements: HTMLElementName[] = ['input', 'textarea'];

    for (const element of htmlElements) {
      const eleRef = ref.querySelector(element);
      if (eleRef) {
        eleRef.disabled = value;
      }
    }
  }

  const setDisable = (fieldName: string, value: boolean) => {
    const ref: HTMLElement = getCurrentHTMLElementRef(fieldName);

    if (!ref) return;

    markDisabled(ref, value);
  }

  return {
    ...formRef,
    setValues,
    getErrorsMui,
    validationContext,
    setReadOnly,
    setDisable,
  };
}

export const useFormContext = <TFieldValues extends FieldValues>(): UseAppFormReturn<TFieldValues> => {
  return useOriginalFormContext() as UseAppFormReturn<TFieldValues>;
};