import { RouteConfig } from '@core/types';
import React from 'react';
import { Switch } from 'react-router-dom';
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

export const createRoutes = (routes: RouteConfig[], parentPath = ''): RouteConfig[] => {
  if (parentPath) {
    return routes.map((route) => {
      route.path = `${parentPath}${route.path}`;
      return route;
    });
  }

  return routes;
};
