import { createValidator } from '@shared/utils/hookform/validationResolver';
import { errorMessages } from './errorMessages';
import { regExp } from './regExp';

export const requiredFieldName = (fieldName: string) => {
  return createValidator(function (value) {
    if (!value) {
      return {
        type: 'requiredFieldName',
        message: errorMessages.requiredFieldName(fieldName),
      };
    }
    return null;
  });
};

export const required = createValidator(function (value) {
  if (!value) {
    return {
      type: 'required',
      message: errorMessages.required,
    };
  }
  return null;
});

export const maxLength = (max: number) => {
  return createValidator(function (value) {
    if (value.length > max) {
      return {
        type: 'maxLength',
        message: errorMessages.maxLength,
      };
    }

    return null;
  });
};

export const minLength = (min: number) => {
  return createValidator(function (value) {
    if (value.length < min) {
      return {
        type: 'minLength',
        message: errorMessages.minLength,
      };
    }

    return null;
  });
};

export const validatePhoneNumber = createValidator(function (value) {
  if (!regExp.numberOnly.test(value)) {
    return {
      type: 'invalidPhoneNumber',
      message: errorMessages.invalidPhoneNumber,
    };
  }
  return null;
});

export const validateEmail = createValidator(function (value) {
  if (!regExp.email.test(value)) {
    return {
      type: 'invalidEmail',
      message: errorMessages.invalidEmail,
    };
  }
  return null;
});
