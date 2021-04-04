import { RouteConfig } from 'core/types';
import React, { lazy } from 'react';
import { LqhRouting } from 'shared/components';
import { createRoutes } from 'shared/components/Routers/LqhRouting';

const routes: RouteConfig[] = createRoutes([
  {
    path: '/',
    exact: true,
    component: lazy(() => import('../features/Sample')),
  },
  {
    path: '/sample',
    component: lazy(() => import('../features/Sample')),
  },
]);

const AppRouter: React.FunctionComponent = () => {
  return <LqhRouting routes={routes} />;
};

export default AppRouter;
