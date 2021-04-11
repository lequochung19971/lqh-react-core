import { RouteConfig } from '@core/types';
import React, { useMemo } from 'react';
import { LqhRouting } from '@shared/components';
import { createRoutes } from '@shared/components/Routers/LqhRouting';
import { useRouteMatch } from 'react-router-dom';
import Employees from './pages/Employees';

const EmployeeRouting: React.FunctionComponent = () => {
  const { url: parentUrl } = useRouteMatch();

  const routes: RouteConfig[] = useMemo(
    () =>
      createRoutes([
        {
          path: '/',
          exact: true,
          component: Employees
        },
        {
          path: '/detail',
        },
      ], parentUrl),
    [],
  );

  return <LqhRouting routes={routes} />;
};

export default EmployeeRouting;
