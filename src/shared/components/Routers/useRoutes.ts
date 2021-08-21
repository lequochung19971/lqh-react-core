import { cloneDeep } from 'lodash';
import { Dispatch, useCallback, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { RouteConfig } from '@shared/types';

import { useRouterContext } from './RouterContext';
import { filterMainRoutes } from './utils';

interface UseRoutesProps {
  routes: RouteConfig[];
  parentUrl?: string;
  isChildren?: boolean;
}

type UseRoutesResult = [RouteConfig[], Dispatch<React.SetStateAction<RouteConfig[]>>];
/**
 * @decs Function that init and map current configured routes for parent route if any.
 * @author hungle
 * @param {UseRoutesProps} props
 * @returns {RouteConfig[]}
 */
export const useRoutes = (props: UseRoutesProps): UseRoutesResult => {
  const { routes: routeConfigs, parentUrl = '', isChildren = false } = props;
  const { path } = useRouteMatch();
  const { loadRouteConfigs } = useRouterContext();

  const mapRoute = useCallback(
    (routeConfigs: RouteConfig[]) => {
      if (!isChildren) {
        return routeConfigs;
      }

      let result = cloneDeep(routeConfigs);

      result = result.map((route) => {
        if (route.path === '/') {
          route.path = path;
        } else {
          route.path = `${parentUrl || path}${route.path}`;
        }

        return route;
      });
      return result;
    },
    [isChildren, parentUrl, path],
  );

  const [routes, setRoutes] = useState(() => {
    const result = mapRoute(routeConfigs);
    return filterMainRoutes(result);
  });

  useEffect(() => {
    loadRouteConfigs(mapRoute(routeConfigs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [routes, setRoutes];
};
