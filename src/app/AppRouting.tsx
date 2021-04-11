import { RouteConfig } from '@core/types';
import React, { lazy, useMemo } from 'react';
import { LqhRouting } from '@shared/components';
import { createRoutes } from '@shared/components/Routers/LqhRouting';

const AppRouting: React.FunctionComponent = () => {
  const routes: RouteConfig[] = useMemo(
    () =>
      createRoutes([
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
      ]),
    [],
  );

  return <LqhRouting routes={routes} />;
};

export default AppRouting;
