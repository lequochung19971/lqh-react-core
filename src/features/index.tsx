import React, { lazy } from 'react';
import { Switch } from 'react-router-dom';
import { Routing, Shell } from '@shared/components';
import { useRoutes } from '@shared/components/Routers/useRoutes';
import { filterMainRoutes, filterUnwrappedRoutes, renderRoutes } from '@shared/components/Routers/utils';

const Features: React.FunctionComponent = () => {
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
        path: '/employee/detail',
        component: lazy(() => import('./Employee/pages/EmployeesDetailPage')),
      },
      {
        path: '*',
        redirectTo: '/page-not-found',
      },
    ],
  });

  return (
    <Switch>
      {renderRoutes(filterUnwrappedRoutes(routes))}
      <Shell>
        <Routing routes={filterMainRoutes(routes)} />
      </Shell>
    </Switch>
  );
};

export default Features;
