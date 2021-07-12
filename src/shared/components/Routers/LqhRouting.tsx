import { RouteConfig } from '@shared/types';
import React, { useMemo } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import { LqhRoute } from '..';

interface Props {
  routes?: RouteConfig[];
}

const LqhRouting: React.FunctionComponent<Props> = (props) => {
  const { routes } = props as Props;
  const renderRoute = () => {
    if (!routes?.length) {
      return null;
    }

    return routes.map((route, index) => {
      return <LqhRoute key={index} {...route} />;
    });
  };

  return (
    <>
      <Switch>{renderRoute()}</Switch>
    </>
  );
};

export default LqhRouting;

/**
 * @decs Function that init and map current configured routes for parent route if any.
 * @author hungle
 * @param {RouteConfig[]} routes 
 * @param {string} parentUrl 
 * @returns {RouteConfig[]}
 */
export const useRoutes = (routes: RouteConfig[], parentUrl = ''): RouteConfig[] => {
  let { url } = useRouteMatch();

  const sliceTheLastCharOfUrl = (url: string, slicedChar: string) => {
    return url.slice(-1) === slicedChar ? url.slice(0, -1) : url;
  };

  url = sliceTheLastCharOfUrl(url, '/');
  parentUrl = sliceTheLastCharOfUrl(parentUrl, '/');

  return useMemo(() => {
    if ((url && url !== '/') || (parentUrl && parentUrl !== '/')) {
      return routes.map((route) => {
        route.path = `${parentUrl || url}${route.path}`;
        return route;
      });
    }

    return routes;
  }, [url, routes, parentUrl]);
};
