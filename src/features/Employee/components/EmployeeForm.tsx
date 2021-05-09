import { Box, Button, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useFormStyles } from '../styles/styles';
import {
  validationResolver,
  createValidator,
  createValidationForm,
  ValidationContext,
  createValidationContext,
} from '@shared/utils/hookform/validation-resolver';
import { Controller, useForm } from '@shared/utils/hookform/form';

interface EmployeeForm {
  firstName: string;
  lastName: string;
  fullName: string;
  dob: string;
  age?: number;
  test: {
    value: string;
  }
}

const defaultValues = {
  firstName: '',
  lastName: '',
  fullName: '',
  dob: '',
};

const required = createValidator<EmployeeForm, string>(function required(value) {
  return {
    type: 'required',
    message: 'required',
  };
});

const inValid = createValidator<EmployeeForm, string>(function inValid(_value: string) {
  return {
    type: 'inValid',
    message: 'inValid',
  };
})

export const validation = createValidationForm<EmployeeForm>({
  firstName: [inValid, required],
  lastName: [required],
  fullName: [required],
  dob: [required],
});
const EmployeeForm: React.FunctionComponent = () => {
  const classes = useFormStyles();

  const {
    control,
    handleSubmit,
    watch,
    getErrorsMui,
    setValue,
    getValues,
    validationContext,
  } = useForm<EmployeeForm, ValidationContext<EmployeeForm>>({
    defaultValues,
    resolver: validationResolver(validation),
    mode: 'onChange',
    context: createValidationContext(),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  console.log(validationContext);
  
  // useEffect(() => {
  //   setValue('fullName', `${getValues('firstName')} ${getValues('lastName')}`);
  // }, [watch('firstName'), watch('lastName')]);

  const onDobKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const regexNumber = /^[0-9]*$/;
    const dayLength = 2;
    const monthLength = 5;

    if (checkAllowKeyCode(event)) {
      return;
    }

    if (!regexNumber.test(event.key)) {
      event.preventDefault();
    }

    const value = (event.target as HTMLInputElement).value;
    if (value.length === dayLength || value.length === monthLength) {
      (event.target as HTMLInputElement).value = value + '/';
    }
  };

  const onDobChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const dobLength = 10;
    const value = event.target.value;

    if (value.length <= dobLength) {
      setValue('dob', event.target.value);
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexWrap="wrap" p="20px">
          <Box display="flex" width="100%">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  {...getErrorsMui('firstName')}
                  label="First Name"
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  {...getErrorsMui('lastName')}
                  label="Last Name"
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Full Name" className={classes.textField} variant="outlined" fullWidth />
              )}
            />
          </Box>
          <Box display="flex" width="100%">
            <Controller
              name="dob"
              {...getErrorsMui('dob')}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onKeyDown={onDobKeyDown}
                  onChange={onDobChange}
                  label="Date of Birth"
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <TextField label="Age" className={classes.textField} variant="outlined" fullWidth />
          </Box>
          <Box display="flex" width="100%">
            <TextField label="Email" className={classes.textField} variant="outlined" fullWidth />
            <TextField label="Phone" className={classes.textField} variant="outlined" fullWidth />
          </Box>
          <Box display="flex" width="100%">
            <TextField label="Department" className={classes.textField} variant="outlined" fullWidth />
            <TextField label="Position" className={classes.textField} variant="outlined" fullWidth />
          </Box>

          <Box display="flex" width="100%">
            <TextField label="Password" className={classes.textField} variant="outlined" fullWidth />
            <TextField
              label="Confirm Password"
              className={classes.textField}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Box>

          <Box m="8px" mt="20px">
            <Button type="submit" color="primary" variant="contained" size="large">
              Save
            </Button>
            <Button color="secondary" variant="contained" size="large">
              Cancel
            </Button>
            <Button color="primary" variant="outlined" size="large" onClick={() => validationContext?.clearValidators('firstName')}>
              Clear Validator
            </Button>
            <Button color="primary" variant="outlined" size="large" onClick={() => validationContext?.setValidators('lastName', [inValid])}>
              Set Validator
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default EmployeeForm;
