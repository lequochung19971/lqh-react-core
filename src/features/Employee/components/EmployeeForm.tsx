import React, { useState } from 'react';
import { IEmployeeForm } from '../types/employeeForm.interface';
import { InputDateField, LqhButton, SelectField } from '@shared/ui-elements';
import { Box, Grid, TextField } from '@material-ui/core';
import dayjs from 'dayjs';
import { departmentDataSource } from '../configs/departmentConfig';
import { defaultValues, validators } from '../configs/employeFormConfig';
import { positionDataSource } from '../configs/positionConfig';
import { SelectDataSource } from '@shared/types/selectDataSource.type';
import AddressDialogField from './AddressDialogField';
import { Controller, useFieldArray, useForm, ValidationContext } from '@shared/utils/hookform';

const EmployeeForm: React.FunctionComponent = () => {
  const { control, handleSubmit, getErrorsMui, setValue, getValues, setDisable } = useForm<
    IEmployeeForm,
    ValidationContext<IEmployeeForm>
  >({
    defaultValues,
    validators,
    mode: 'onChange',
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'test' });

  const [positionData, setPositionData] = useState([] as SelectDataSource<string>[]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleSetFullName = () => {
    setValue('fullName', `${getValues('firstName')} ${getValues('lastName')}`);
  };

  const handleDobChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = event.target;
    const now = dayjs(new Date());
    const dobLength = 10;
    if (value.length === dobLength) {
      const age = now.diff(value, 'year');
      setValue('age', age.toString());
      setDisable('age', true);
    }
  };

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const positions = positionDataSource.find((source) => source.id === event.target.value);
    if (positions) {
      setPositionData(positions.data);
    }
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
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      {...getErrorsMui('firstName')}
                      onChange={handleSetFullName}
                      label="First Name"
                      fullWidth
                      required
                    />
                  );
                }}
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
                    onChange={handleSetFullName}
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
                render={({ field }) => (
                  <TextField
                    {...field}
                    {...getErrorsMui('fullName')}
                    label="Full Name"
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <InputDateField
                    {...field}
                    {...getErrorsMui('dob')}
                    onChange={handleDobChange}
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
                render={({ field }) => <TextField {...field} {...getErrorsMui('age')} label="Age" fullWidth />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <TextField {...field} {...getErrorsMui('email')} label="Email" fullWidth />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <TextField {...field} {...getErrorsMui('phone')} label="Phone" fullWidth />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    {...getErrorsMui('department')}
                    onChange={handleDepartmentChange}
                    label="Department"
                    dataSource={departmentDataSource}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="position"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    {...getErrorsMui('position')}
                    label="Position"
                    dataSource={positionData}
                    fullWidth
                    disabled={!positionData.length}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="addressValue"
                control={control}
                render={({ field }) => (
                  <AddressDialogField
                    {...field}
                    {...getErrorsMui('addressValue')}
                    label="Address Information"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField label="Password" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Confirm Password" fullWidth />
            </Grid>
            {fields.map((f, index) => {
              return (
                <>
                  <Grid key={`input-${index}`} item xs={9}>
                    <Controller
                      name={`test.${index}.value` as `test.${number}.value`}
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} {...getErrorsMui(`test.${index}.value`)} label="value" fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid key={`btn-${index}`} item xs={3}>
                    <LqhButton color="secondary" variant="contained" size="large" onClick={() => remove(index)}>
                      Remove
                    </LqhButton>
                  </Grid>
                </>
              );
            })}

            <Grid item xs={12}>
              <LqhButton type="submit" color="primary" variant="contained" size="large" mr="10px">
                Save
              </LqhButton>
              <LqhButton color="secondary" variant="contained" size="large">
                Cancel
              </LqhButton>
              <LqhButton
                type="button"
                color="default"
                variant="contained"
                size="large"
                ml="10px"
                onClick={() => append({ value: '123' })}
              >
                Append Field
              </LqhButton>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default EmployeeForm;
