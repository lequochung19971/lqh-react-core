import { RouteConfig } from '@shared/types';
import React, { useMemo } from 'react';
import { LqhRouting } from '@shared/components';
import { createRoutes } from '@shared/components/Routers/LqhRouting';
import { useRouteMatch } from 'react-router-dom';
import EmployeesPage from './pages/EmployeesPage';

const EmployeeRouting: React.FunctionComponent = () => {
  const { url: parentUrl } = useRouteMatch();

  const routes: RouteConfig[] = useMemo(
    () =>
      createRoutes([
        {
          path: '/',
          exact: true,
          component: EmployeesPage
        },
        {
          path: '/detail',
        },
      ], parentUrl),
    [parentUrl],
  );

  return <LqhRouting routes={routes} />;
};

export default EmployeeRouting;
