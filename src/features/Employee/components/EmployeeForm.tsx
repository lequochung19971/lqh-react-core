import { Box, Button, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useFormStyles } from '../styles/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, FormProvider, useForm, useFormContext } from '@shared/hooks';
import { invalidFirstName } from '@shared/validations/employee.validation';

// type EmployeeForm = Omit<EmployeeModel, '_id' | 'avatar' | 'fullName' | '_guid'>;

interface EmployeeForm {
  firstName: string;
  lastName: string;
  fullName: string;
  dob: string;
}

yup.addMethod(yup.string, 'invalidFirstName', invalidFirstName);
const schema: any = yup.object().shape({
  firstName: yup.string().required('Required').invalidFirstName('Test'),
  lastName: yup.string().required('Required'),
  fullName: yup.string().required('Required'),
  dob: yup.string()
});

const defaultValues = {
  firstName: '',
  lastName: '',
  fullName: '',
  dob: '',
};

const EmployeeForm: React.FunctionComponent = () => {
  const classes = useFormStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValues,
    getErrorsMui,
  } = useForm<EmployeeForm>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange'
  });
  const methods = useForm<EmployeeForm>({
    defaultValues,
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',

  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    console.log(errors);
  }, [watch('firstName')]);

  const handleClick = () => {
    setValues({
      firstName: 'Le',
      lastName: 'Hung',
      fullName: 'Le Hung',
      dob: '12/12/2012',
    });
  };

  return (
    <>
      <FormProvider {...methods}>
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
              <Button color="primary" variant="outlined" size="large" onClick={handleClick}>
                Field Data
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </>
  );
};

export default EmployeeForm;

const TestFormComponent = () => {
  const methods = useFormContext();
  console.log(methods);
  return <div>TestFormComponent</div>;
};
