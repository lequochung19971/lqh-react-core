import React, { lazy } from 'react';
import { LqhRouting, Shell } from '@shared/components';
import { useRoutes } from '@shared/components/Routers/useRoutes';

const FeatureRouting: React.FunctionComponent = () => {
  const [routes] = useRoutes({
    routes: [
      {
        path: '/',
        exact: true,
        redirectTo: './sample',
      },
      {
        path: '/sample',
        component: lazy(() => import('./Sample')),
      },
      {
        path: '/employee',
        component: lazy(() => import('./Employee')),
      },
      {
        path: '*',
        redirectTo: '/page-not-found',
      },
    ],
  });

  return (
    <>
      <Shell>
        <LqhRouting routes={routes} />
      </Shell>
    </>
  );
};

export default FeatureRouting;
