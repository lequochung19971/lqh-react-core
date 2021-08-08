import { RouteConfig } from '@shared/types';
import React from 'react';
import { useRoutes, LqhRouting } from '@shared/components';
import SamplePage from './pages/SamplePage';

const SampleRouting: React.FunctionComponent = () => {
  const routes: RouteConfig[] = useRoutes([
    {
      path: '/',
      exact: true,
      component: SamplePage,
    },
  ]);

  return <LqhRouting routes={routes} />;
};

export default SampleRouting;
