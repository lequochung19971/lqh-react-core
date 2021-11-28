import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
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
} from '@mui/material';
import employeeColumnsConfig from '../configs/employeeColumnsConfig';
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
  const employees = mockData;
  const [open, setOpen] = useState(false);

  const onClose = (value: unknown) => {
    console.log(value);
    setOpen(false);
  };

  return (
    <>
      <Paper
        sx={{
          width: '100%',
        }}
      >
        <Box display="flex" justifyContent="space-between" width="100%" p="1rem">
          <Typography variant="h6">Employees</Typography>
          <Button variant="contained" color="secondary" onClick={() => setOpen(true)} startIcon={<AddIcon />}>
            Add Employee
          </Button>
        </Box>
        <TableContainer sx={{ maxHeight: '400px' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {employeeColumnsConfig.map((column) => (
                  <TableCell key={column.id} sx={{ fontWeight: 600 }}>
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
