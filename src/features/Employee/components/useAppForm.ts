/* eslint-disable @typescript-eslint/ban-types */
import { FieldValues, useForm, useFormContext, UseFormProps, UseFormReturn } from 'react-hook-form';

interface UseAppFormReturn<TFieldValues extends FieldValues = FieldValues> extends UseFormReturn<TFieldValues> {
	TestFunc: () => void;
}

export default function useMaterialHookForm<TFieldValues extends FieldValues = FieldValues, TContext extends object = object>(
  props?: UseFormProps<TFieldValues, TContext>,
): UseAppFormReturn<TFieldValues> {
  const methods = useForm(props);

	const TestFunc = () => {
		console.log('TestFunc');
	}

	return {
		...methods,
		TestFunc
	};
}

export const useAppFormContext = <TFieldValues extends FieldValues>(): UseAppFormReturn<TFieldValues> => {
	return useFormContext() as UseAppFormReturn<TFieldValues>;
}
