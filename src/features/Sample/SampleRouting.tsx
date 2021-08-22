import React from 'react';
import { Routing } from '@shared/components';
import { useRoutes } from '@shared/components/Routers/useRoutes';
import SamplePage from './pages/SamplePage';

const SampleRouting: React.FunctionComponent = () => {
  const [routes] = useRoutes({
    routes: [
      {
        path: '/',
        exact: true,
        component: SamplePage,
      },
    ],
    isChildren: true,
  });

  return <Routing routes={routes} />;
};

export default SampleRouting;
