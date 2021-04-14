import { Box, Button, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useFormStyles } from '../styles/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, FormProvider, useForm, useFormContext } from '@shared/hooks/custom-react-hook-form';

// type EmployeeForm = Omit<EmployeeModel, '_id' | 'avatar' | 'fullName' | '_guid'>;
interface EmployeeForm {
  firstName: string;
  lastName: string;
  fullName: string;
}

const schema: yup.SchemaOf<EmployeeForm> = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  fullName: yup.string().required('Required'),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  fullName: '',
};

const EmployeeForm: React.FunctionComponent = () => {
  const classes = useFormStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValues,
  } = useForm<EmployeeForm>({
    defaultValues,
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
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
    })
  }

  return (
    <>
      <FormProvider {...methods}>
        <TestFormComponent />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexWrap="wrap" p="20px">
            <Box display="flex" width="100%">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    helperText={errors.firstName?.message}
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
                  <TextField {...field} label="Last Name" className={classes.textField} variant="outlined" fullWidth />
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
              <TextField label="Date of Birth" className={classes.textField} variant="outlined" fullWidth />
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
              <Button type="submit" color="primary" variant="contained" size="large" >
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
  return <div>TestFormComponent</div>
}
