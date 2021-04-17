/* eslint-disable @typescript-eslint/ban-types */
import {
  useForm as useOriginalForm,
  useFormContext as useOriginalFormContext,
  FieldValues,
  UseFormProps,
  UseFormReturn,
  FieldError,
} from 'react-hook-form';

export * from 'react-hook-form'

interface UseAppFormReturn<TFieldValues extends FieldValues = FieldValues> extends UseFormReturn<TFieldValues> {
  setValues: (data: TFieldValues) => void;
  getErrorsMui: (fieldName: string) => { error: boolean, helperText: string }
}

export function useForm<TFieldValues extends FieldValues = FieldValues, TContext extends object = object>(
  props?: UseFormProps<TFieldValues, TContext>,
): UseAppFormReturn<TFieldValues> {
  const formRef = useOriginalForm<TFieldValues, TContext>(props);

  const setValues = (data: TFieldValues) => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formRef.setValue(key as any, data[key]);
      }
    }
  };

  const getErrorsMui = (fieldName: string) => {
    const currentError = formRef.formState.errors[fieldName] as FieldError;
    return {
      error: !!currentError,
      helperText: currentError?.message ?? ''
    }
  }

  return {
    ...formRef,
    setValues,
    getErrorsMui
  };
}

export const useFormContext = <TFieldValues extends FieldValues>(): UseAppFormReturn<TFieldValues> => {
  return useOriginalFormContext() as UseAppFormReturn<TFieldValues>;
};