import React from 'react';
import { Link } from 'react-router-dom';
import { useLoadingContext } from '@shared/contexts';
import EmployeeTable from '../components/EmployeeTable';

const EmployeesPage: React.FunctionComponent = () => {
  const { isPageLoading } = useLoadingContext();
  return (
    <>
      <Link to="/employee/detail">Detail</Link>
      <EmployeeTable />
    </>
  );
};

export default EmployeesPage;
