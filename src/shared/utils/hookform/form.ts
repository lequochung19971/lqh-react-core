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

  return {
    ...formRef,
    setValues,
    getErrorsMui,
    validationContext
  };
}

export const useFormContext = <TFieldValues extends FieldValues>(): UseAppFormReturn<TFieldValues> => {
  return useOriginalFormContext() as UseAppFormReturn<TFieldValues>;
};