import React, { useEffect } from 'react';
import {
  validationResolver,
  createValidationForm,
  ValidationContext,
  createValidationContext,
} from '@shared/utils/hookform/validationResolver';
import { Controller, useForm } from '@shared/utils/hookform/form';
import { IEmployeeForm } from '../types/employeeForm.interface';
import { required } from '../validators/employee.validator';
import { LqhButton } from '@shared/ui-elements';
import { Box, Button, Checkbox, Grid, TextField } from '@material-ui/core';
import dayjs from 'dayjs';

const defaultValues = {
  firstName: '',
  lastName: '',
  fullName: '',
  dob: '',
  age: '',
  testField: '',
};

export const validation = createValidationForm<IEmployeeForm>({
  firstName: [required],
  lastName: [required],
  fullName: [required],
  dob: [required],
  age: [required]
});

const EmployeeForm: React.FunctionComponent = () => {
  const { control, handleSubmit, watch, getErrorsMui, setValue, getValues, setReadOnly, setDisable } = useForm<
    IEmployeeForm,
    ValidationContext<IEmployeeForm>
  >({
    defaultValues,
    resolver: validationResolver(validation),
    mode: 'onChange',
    context: createValidationContext(),
  });

  const dayLength = 2;
  const monthLength = 5;
  const dobLength = 10;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const setFullName = () => {
    setValue('fullName', `${getValues('firstName')} ${getValues('lastName')}`.trim());
  };

  const onDobKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const regexNumber = /^[0-9]*$/;


    if (checkAllowKeyCode(event)) {
      return;
    }

    const value = (event.target as HTMLInputElement).value;
    if (!regexNumber.test(event.key) || value.length === dobLength) {
      event.preventDefault();
    }

    if (value.length === dayLength || value.length === monthLength) {
      (event.target as HTMLInputElement).value = value + '/';
    }
  };

  const onDobChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = event.target;
    setValue('dob', value);
    const now = dayjs(new Date());
    if (value.length === dobLength) {
      console.log(control);
      const age = now.diff(value, 'year');
      setValue('age', age.toString());
      // setReadOnly('testField', true);
      setDisable('testField', true);
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
        <Box p="50px">
          <Grid container spacing={4} xs={8}>
            <Grid item xs={4}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    {...getErrorsMui('firstName')}
                    onChange={setFullName}
                    label="First Name"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    {...getErrorsMui('lastName')}
                    onChange={setFullName}
                    label="Last Name"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => <TextField {...field} label="Full Name" fullWidth />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    {...getErrorsMui('dob')}
                    onKeyDown={onDobKeyDown}
                    onChange={onDobChange}
                    label="Date of Birth"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    {...getErrorsMui('age')}
                    label="Age"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Email" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Phone" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Department" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Position" fullWidth />
            </Grid>

            <Grid item xs={6}>
              <TextField label="Password" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Confirm Password" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <LqhButton type="submit" color="primary" variant="contained" size="large" mr="10px">
                Save
              </LqhButton>
              <LqhButton color="secondary" variant="contained" size="large">
                Cancel
              </LqhButton>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default EmployeeForm;
