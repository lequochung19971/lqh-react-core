import React from 'react';
import Login from '@features/Login';
import { Routing } from '@shared/components';
import PageNotFound from '@shared/components/PageNotFound';
import { useRoutes } from '@shared/components/Routers/useRoutes';
import Features from '@features';

const AppRouting: React.FunctionComponent = () => {
  const [routes] = useRoutes({
    routes: [
      {
        path: '/login',
        exact: true,
        component: Login,
      },
      {
        path: '/page-not-found',
        component: PageNotFound,
      },
      {
        path: '/',
        component: Features,
      },
    ],
  });

  return <Routing routes={routes} />;
};

export default AppRouting;
