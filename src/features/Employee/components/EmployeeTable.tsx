import React, { useState } from 'react';

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import employeeColumnsConfig from '../configs/employeeColumnsConfig';
import { useEmployeeStyles } from '../styles/styles';
import EmployeeFormDialog from './EmployeeFormDialog';

const mockData = [
  {
    _id: '123123123123123',
    fullName: 'Le Quoc Hung',
    dob: '12/03/1997',
    department: 'IT',
    position: 'Frontend Developer',
    gender: 'Male',
  },
];

const EmployeeTable: React.FunctionComponent = () => {
  const classes = useEmployeeStyles();
  const employees = mockData;
  const [open, setOpen] = useState(false);

  const onClose = (value: unknown) => {
    console.log(value);
    setOpen(false);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Box display="flex" justifyContent="space-between" width="100%" p="1rem">
          <Typography variant="h6">Employees</Typography>
          <Button variant="contained" color="secondary" onClick={() => setOpen(true)} startIcon={<AddIcon />}>
            Add Employee
          </Button>
        </Box>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {employeeColumnsConfig.map((column) => (
                  <TableCell key={column.id} className={classes.tableHeaderCell}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={employee._id}>
                    {employeeColumnsConfig.map((column) => {
                      const value = employee[column.id];
                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <EmployeeFormDialog open={open} onClose={onClose} />
    </>
  );
};

export default EmployeeTable;
