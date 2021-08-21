import React, { useEffect, useMemo } from 'react';
import Login from '@features/Login';
import { LqhRouting } from '@shared/components';
import PageNotFound from '@shared/components/PageNotFound';
import { useRouterContext } from '@shared/components/Routers/RouterContext';
import { useRoutes } from '@shared/components/Routers/useRoutes';
import { RouteConfig } from '@shared/types';
import FeatureRouting from '@features';

const AppRouting: React.FunctionComponent = () => {
  const { unwrappedRouteConfigs } = useRouterContext();

  const routeConfigs: RouteConfig[] = useMemo(
    () => [
      {
        path: '/login',
        exact: true,
        component: Login,
      },
      ...unwrappedRouteConfigs,
      {
        path: '/page-not-found',
        component: PageNotFound,
      },
      {
        path: '/',
        component: FeatureRouting,
      },
    ],
    [unwrappedRouteConfigs],
  );

  const [routes, setRoutes] = useRoutes({
    routes: routeConfigs,
  });

  useEffect(() => {
    if (unwrappedRouteConfigs.length) {
      setRoutes(routeConfigs);
    }
  }, [routeConfigs, setRoutes, unwrappedRouteConfigs]);

  return <LqhRouting routes={routes} />;
};

export default AppRouting;
