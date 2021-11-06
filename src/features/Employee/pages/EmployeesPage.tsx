import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoadingContext } from '@shared/contexts';
import EmployeeTable from '../components/EmployeeTable';

const EmployeesPage: React.FunctionComponent = () => {
  const [state, setState] = useState(() => {
    console.log('EmployeesPage - useState');
    return 10;
  });
  const { isPageLoading } = useLoadingContext();
  return (
    <>
      <Link to="/employee/detail">Detail</Link>
      <Link to="/employee/other">Other</Link>
      <EmployeeTable />
    </>
  );
};

export default EmployeesPage;
