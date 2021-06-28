import { RouteConfig } from '@shared/types';
import React from 'react';
import { useRouteMatch } from 'react-router';
import { createRoutes, LqhRouting } from '@shared/components';
import SamplePage from './pages/SamplePage';

const SampleRouting: React.FunctionComponent = () => {
  const { url } = useRouteMatch();

  const routes: RouteConfig[] = createRoutes(
    [
      {
        path: '/',
        exact: true,
        component: SamplePage,
      },
    ],
    url,
  );

  return <LqhRouting routes={routes} />;
};

export default SampleRouting;
