import React from 'react';
import { LqhRouting } from '@shared/components';
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

  return <LqhRouting routes={routes} />;
};

export default SampleRouting;
