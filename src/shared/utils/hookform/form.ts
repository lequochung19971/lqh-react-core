/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-types */
import { get, set } from 'lodash';
import { useLayoutEffect, useRef, useState } from 'react';
import {
  useForm as useOriginalForm,
  useFormContext as useOriginalFormContext,
  FieldValues,
  UseFormProps as UseOriginalFormProps,
  UseFormReturn as UseOriginalFormReturn,
  FieldError,
  Field,
  Resolver,
} from 'react-hook-form';
import { ValidatorFnConfigs } from './types';
import { isFieldsRefChanged, isLiveInDOM } from './utils';
import { createValidationContext, ValidationContext, validationResolver } from './validationResolver';

export * from 'react-hook-form';

const traverseAndCollectFieldName = (fieldsRef: Partial<Record<string, Field>>, target: string[]) => {
  for (const key in fieldsRef) {
    if (fieldsRef.hasOwnProperty(key)) {
      const value: any = fieldsRef[key];
      if (key === '_f') {
        const fieldName: string = get(value, 'name') as string;
        target.push(fieldName);
      } else {
        traverseAndCollectFieldName(value, target);
      }
    }
  }
};

const getFieldsNameFromFieldsRef = (fieldsRef: Partial<Record<string, Field>>): string[] => {
  const fieldNames: string[] = [];
  traverseAndCollectFieldName(fieldsRef, fieldNames);
  return fieldNames;
};

const forFieldElement = (
  parentElementRef: HTMLElement,
  callback: (elementRef: HTMLInputElement | HTMLTextAreaElement, elementName: string) => void,
) => {
  if (!isLiveInDOM(parentElementRef)) return;

  type HTMLElementName = 'input' | 'textarea';
  const htmlElementNames: HTMLElementName[] = ['input', 'textarea'];

  for (const elementName of htmlElementNames) {
    const elementRef = parentElementRef.querySelector(elementName);
    if (elementRef && isLiveInDOM(elementRef)) {
      callback(elementRef, elementName);
    }
  }
};

const getCurrentHTMLElementRef = <TFieldValues>(
  fieldName: string,
  formRef: UseOriginalFormReturn<TFieldValues>,
): HTMLElement => {
  const { fieldsRef } = formRef.control;
  const pathRef = `${fieldName}._f.ref`;
  const ref: HTMLElement = (get(fieldsRef.current, pathRef) as unknown) as HTMLElement;
  return ref;
};

interface UseFormReturn<TFieldValues extends FieldValues = FieldValues, TContext extends object = object>
  extends UseOriginalFormReturn<TFieldValues> {
  setValues: (_data: TFieldValues) => void;
  getErrorsMui: (fieldName: string) => { error: boolean; helperText: string };
  setReadOnly: (fieldName: string, value: boolean) => void;
  setDisable: (fieldName: string, value: boolean) => void;
  validationContext: ValidationContext<TFieldValues> | undefined | TContext;
  readonly disabledFields: Record<string, boolean>;
  readonly readOnlyFields: object;
}

interface UseFormProps<TFieldValues extends FieldValues = FieldValues, TContext extends object = object>
  extends UseOriginalFormProps<TFieldValues, TContext> {
  validators?: ValidatorFnConfigs<TFieldValues>;
}

export function useForm<TFieldValues extends FieldValues = FieldValues, TContext extends object = object>(
  props: UseFormProps<TFieldValues, TContext>,
): UseFormReturn<TFieldValues, TContext> {
  const [disabledFields, setDisabledFields] = useState({});
  const [readOnlyFields, setReadOnlyFields] = useState({});
  const [fieldNames, setFieldNames] = useState<string[]>([]);

  const disabledFieldsRef = useRef({});
  const readOnlyFieldsRef = useRef({});
  const { validators, ...originalFormProps } = props;
  const fieldNamesRef = useRef([] as string[]);
  const validationContext = createValidationContext();

  const formRef = useOriginalForm<TFieldValues, TContext>({
    ...originalFormProps,
    resolver: validators
      ? (validationResolver<TFieldValues>(validators, fieldNamesRef, validationContext) as Resolver<
          TFieldValues,
          object
        >)
      : originalFormProps.resolver,
    context: validators ? (validationContext as TContext) : originalFormProps.context,
  });

  fieldNamesRef.current = fieldNames;
  disabledFieldsRef.current = disabledFields;
  readOnlyFieldsRef.current = readOnlyFields;

  useLayoutEffect(() => {
    const newFieldNames = getFieldsNameFromFieldsRef(formRef.control.fieldsRef.current);
    const isChanged = isFieldsRefChanged(fieldNamesRef.current, newFieldNames);
    if (isChanged) {
      setFieldNames(newFieldNames);
    }
  });

  useLayoutEffect(() => {
    const loadDisabledFieldRef = () => {
      const target = { ...disabledFields };
      for (const fieldName of fieldNamesRef.current) {
        const elementRef = getCurrentHTMLElementRef<TFieldValues>(fieldName, formRef);
        if (isLiveInDOM(elementRef)) {
          forFieldElement(elementRef, (el) => {
            set(target, fieldName, el.disabled);
          });
        }
      }
      setDisabledFields(target);
    };

    const loadReadOnlyFieldRef = () => {
      const target = { ...readOnlyFields };
      for (const fieldName of fieldNamesRef.current) {
        const elementRef = getCurrentHTMLElementRef<TFieldValues>(fieldName, formRef);
        if (isLiveInDOM(elementRef)) {
          forFieldElement(elementRef, (el) => {
            set(target, fieldName, el.readOnly);
          });
        }
      }
      setReadOnlyFields(target);
    };
    loadDisabledFieldRef();
    loadReadOnlyFieldRef();
  }, [fieldNames]);

  const setValues = (data: TFieldValues) => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formRef.setValue(key as any, data[key]);
      }
    }
  };

  const markReadOnly = (fieldName: string, parentElement: HTMLElement, value: boolean) => {
    const target = { ...readOnlyFields };
    forFieldElement(parentElement, (element) => {
      element.readOnly = value;
      set(target, fieldName, value);
      setReadOnlyFields(target);
    });
  };

  const setReadOnly = (fieldName: string, value: boolean) => {
    const ref: HTMLElement = getCurrentHTMLElementRef<TFieldValues>(fieldName, formRef);

    if (!ref) return;

    markReadOnly(fieldName, ref, value);
  };

  const markDisabled = (fieldName: string, parentElement: HTMLElement, value: boolean) => {
    const target = { ...disabledFields };
    forFieldElement(parentElement, (element) => {
      element.disabled = value;
      set(target, fieldName, value);
      setDisabledFields(target);
    });
  };

  const setDisable = (fieldName: string, value: boolean) => {
    const ref: HTMLElement = getCurrentHTMLElementRef<TFieldValues>(fieldName, formRef);

    if (!ref) return;

    markDisabled(fieldName, ref, value);
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
    setValues,
    getErrorsMui,
    validationContext,
    setReadOnly,
    setDisable,
    disabledFields,
    readOnlyFields,
  };
}

export const useFormContext = <TFieldValues extends FieldValues>(): UseFormReturn<TFieldValues> => {
  return useOriginalFormContext() as UseFormReturn<TFieldValues>;
};
