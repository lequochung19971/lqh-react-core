import { useLoadingContext } from '@shared/contexts';
import React from 'react';
import EmployeeTable from '../components/EmployeeTable';

const EmployeesPage: React.FunctionComponent = () => {
  const { isPageLoading } = useLoadingContext();
  console.log(isPageLoading);
  return (
    <>
      <EmployeeTable />
    </>
  );
};

export default EmployeesPage;
