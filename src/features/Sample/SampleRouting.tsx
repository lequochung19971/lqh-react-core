import React, { lazy } from 'react';
import { Routing } from '@shared/components';
import { useRoutes } from '@shared/components/Routers/useRoutes';

const SamplePage = lazy(() => import('./pages/SamplePage'));
const SampleDialogPage = lazy(() => import('./pages/SampleDialogPage'));
const SampleRouting: React.FunctionComponent = () => {
  const [routes] = useRoutes({
    routes: [
      {
        path: '/',
        exact: true,
        component: SamplePage,
      },
      {
        path: '/dialog',
        exact: true,
        component: SampleDialogPage,
      },
      {
        path: '*',
        redirectTo: '/page-not-found',
      },
    ],
    isChildren: true,
  });

  return <Routing routes={routes} />;
};

export default SampleRouting;
