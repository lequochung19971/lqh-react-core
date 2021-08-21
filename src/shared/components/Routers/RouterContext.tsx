import { unionBy } from 'lodash';
import { useState } from 'react';
import { RouteConfig } from '@shared/types';
import { createContext } from '@shared/utils';
import { filterUnwrappedRoutes } from './utils';

interface RouterContextRef {
  loadRouteConfigs: (routerConfigs: RouteConfig[]) => void;
  routeConfigs: RouteConfig[];
  unwrappedRouteConfigs: RouteConfig[];
}

export const [RouterContext, useRouterContext] = createContext<RouterContextRef>({} as RouterContextRef);

export const RouterProvider: React.FunctionComponent = (props) => {
  const { children } = props;
  const [routeConfigs, setRouteConfigs] = useState<RouteConfig[]>([]);
  const [unwrappedRouteConfigs, setUnwrappedRouteConfigs] = useState<RouteConfig[]>([]);

  const loadRouteConfigs = (routes: RouteConfig[]) => {
    if (routes.length) {
      routes = unionBy([...routeConfigs, ...routes], 'path');
      setRouteConfigs(routes);
      loadUnwrappedRoutes(routes);
    }
  };

  const loadUnwrappedRoutes = (routes: RouteConfig[]) => {
    if (routes.length) {
      let unwrappedRoutes = filterUnwrappedRoutes(routes);
      unwrappedRoutes = unionBy([...unwrappedRouteConfigs, ...unwrappedRoutes], 'path');
      setUnwrappedRouteConfigs(unwrappedRoutes);
    }
  };

  const instance = {
    loadRouteConfigs,
    routeConfigs,
    unwrappedRouteConfigs,
  };

  return <RouterContext.Provider value={instance}>{children}</RouterContext.Provider>;
};
