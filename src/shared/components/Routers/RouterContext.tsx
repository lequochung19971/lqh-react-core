import { unionBy } from 'lodash';
import { useState } from 'react';
import { RouteConfig } from '@shared/types';
import { createContext } from '@shared/utils';

interface RouterContextRef {
  loadRouteConfigs: (routerConfigs: RouteConfig[]) => void;
  routeConfigs: RouteConfig[];
}

export const [RouterContext, useRouterContext] = createContext<RouterContextRef>({} as RouterContextRef);

export const RouterProvider: React.FunctionComponent = (props) => {
  const { children } = props;
  const [routeConfigs, setRouteConfigs] = useState<RouteConfig[]>([]);

  const loadRouteConfigs = (routes: RouteConfig[]) => {
    if (routes.length) {
      routes = unionBy([...routeConfigs, ...routes], 'path');
      setRouteConfigs(routes);
    }
  };

  const instance = {
    loadRouteConfigs,
    routeConfigs,
  };

  return <RouterContext.Provider value={instance}>{children}</RouterContext.Provider>;
};
