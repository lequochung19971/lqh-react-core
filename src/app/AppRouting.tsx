import { RouteConfig } from '@shared/types';
import React, { lazy } from 'react';
import { LqhRouting } from '@shared/components';
import { useRoutes } from '@shared/components/Routers/LqhRouting';

const AppRouting: React.FunctionComponent = () => {
  const routes: RouteConfig[] = useRoutes([
    {
      path: '/',
      exact: true,
      component: lazy(() => import('../features/Sample')),
    },
    {
      path: '/sample',
      component: lazy(() => import('../features/Sample')),
    },
    {
      path: '/employee',
      component: lazy(() => import('../features/Employee')),
    },
  ]);

  return <LqhRouting routes={routes} />;
};

export default AppRouting;
