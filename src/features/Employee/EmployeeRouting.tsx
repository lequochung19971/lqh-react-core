import React from 'react';
import { RouteConfig } from '@shared/types';
import { LqhRouting } from '@shared/components';
import { useRoutes } from '@shared/components/Routers/LqhRouting';
import EmployeesPage from './pages/EmployeesPage';

const EmployeeRouting: React.FunctionComponent = () => {
  const routes: RouteConfig[] = useRoutes([
    {
      path: '/',
      exact: true,
      component: EmployeesPage,
    },
    {
      path: '/detail',
    },
  ]);

  return <LqhRouting routes={routes} />;
};

export default EmployeeRouting;
