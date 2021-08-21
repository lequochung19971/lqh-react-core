import React from 'react';
import { useState } from 'react';

import { TextField, TextFieldProps } from '@material-ui/core';

export const InputDateField = React.forwardRef<any, TextFieldProps>(function InputDateField(props, ref) {
  const { value, onChange, ...restProps } = props;
  const [inputValue, setInputValue] = useState(value);

  const DAY_LENGTH = 2;
  const MONTH_LENGTH = 5;
  const DOB_LENGTH = 10;

  const onDobKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const regexNumber = /^[0-9]*$/;

    if (checkAllowKeyCode(event)) {
      return;
    }

    const value = (event.target as HTMLInputElement).value;
    if (!regexNumber.test(event.key) || value.length === DOB_LENGTH) {
      event.preventDefault();
    }

    if (value.length === DAY_LENGTH || value.length === MONTH_LENGTH) {
      (event.target as HTMLInputElement).value = value + '/';
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);

    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  const checkAllowKeyCode = (event: React.KeyboardEvent<HTMLDivElement>): boolean => {
    if (
      ['Tab', 'Delete', 'Backspace', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'End', 'Home'].indexOf(
        event.key,
      ) !== -1 ||
      // Allow: Ctrl + A
      (event.key === 'a' && event.ctrlKey === true) ||
      // Allow: Ctrl + C
      (event.key === 'c' && event.ctrlKey === true) ||
      // Allow: Ctrl + V
      (event.key === 'v' && event.ctrlKey === true) ||
      // Allow: Ctrl + X
      (event.key === 'x' && event.ctrlKey === true)
    ) {
      return true;
    }

    return false;
  };
  return (
    <TextField
      ref={ref}
      {...restProps}
      value={inputValue}
      onKeyDown={onDobKeyDown}
      onChange={handleInputChange}
      fullWidth
    />
  );
});
