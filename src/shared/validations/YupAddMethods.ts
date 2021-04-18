import * as yup from 'yup';
import { YupMethodType } from '@shared/types';

export const YupAddMethods = (validatorMethods: YupMethodType[]): void => {
  for (const method of validatorMethods) {
    for (const [key, value] of Object.entries(method)) {
			yup.addMethod(method.schemaType, key, value);
    }
  }
};