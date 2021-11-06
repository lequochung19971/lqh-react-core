import React, { lazy } from 'react';
import { Routing } from '@shared/components';
import { useRoutes } from '@shared/components/Routers/useRoutes';

const SamplePage = lazy(() => import('./pages/SamplePage'));
const SampleRouting: React.FunctionComponent = () => {
  const [routes] = useRoutes({
    routes: [
      {
        path: '/',
        exact: true,
        component: SamplePage,
      },
    ],
    isChildren: true,
  });

  return <Routing routes={routes} />;
};

export default SampleRouting;
