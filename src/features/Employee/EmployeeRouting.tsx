import React, { lazy } from 'react';
import { Routing } from '@shared/components';
import { useRoutes } from '@shared/components/Routers/useRoutes';

const EmployeesPage = lazy(() => import('./pages/EmployeesPage'));
const EmployeesDetailPage = lazy(() => import('./pages/EmployeesDetailPage'));

const EmployeeRouting: React.FunctionComponent = () => {
  const [routes] = useRoutes({
    routes: [
      {
        path: '/',
        exact: true,
        component: EmployeesPage,
      },
      {
        path: '/detail',
        exact: true,
        component: EmployeesDetailPage,
      },
      {
        path: '*',
        redirectTo: '/page-not-foundd',
      },
    ],
    isChildren: true,
  });

  return <Routing routes={routes} />;
};

export default EmployeeRouting;
