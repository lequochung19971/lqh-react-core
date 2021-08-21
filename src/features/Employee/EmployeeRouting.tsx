import React, { lazy } from 'react';

import { LqhRouting } from '@shared/components';
import { useRoutes } from '@shared/components/Routers/useRoutes';

import EmployeesDetailPage from './pages/EmployeesDetailPage';

const EmployeeRouting: React.FunctionComponent = () => {
  const [routes] = useRoutes({
    routes: [
      {
        path: '/',
        exact: true,
        component: lazy(() => import('./pages/EmployeesPage')),
      },
      {
        path: '/detail',
        exact: true,
        component: EmployeesDetailPage,
        unwrapped: true,
      },
      {
        path: '*',
        redirectTo: '/page-not-foundd',
      },
    ],
    isChildren: true,
  });

  return <LqhRouting routes={routes} />;
};

export default EmployeeRouting;
