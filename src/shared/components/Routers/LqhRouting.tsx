import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteConfig } from '@shared/types';
import { PrivateRoute } from '..';

interface Props {
  routes: RouteConfig<unknown>[];
}

const LqhRouting: React.FunctionComponent<Props> = (props) => {
  const { routes } = props as Props;

  const renderRoute = () => {
    if (!routes?.length) {
      return null;
    }

    return routes.map((route) => {
      return <PrivateRoute key={route.path as string} {...route} />;
    });
  };
  return <Switch>{renderRoute()}</Switch>;
};

export default LqhRouting;
