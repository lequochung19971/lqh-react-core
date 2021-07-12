import { RouteConfig } from '@shared/types';
import React, { useMemo } from 'react';
import { Redirect, Route } from 'react-router-dom';

const LqhRoute: React.FunctionComponent<RouteConfig> = (props) => {
  const { guard: { canActive = true, redirectBackTo = '' } = {}, redirect, ...restProps } = props;

  const elements = useMemo(() => {
    if (redirect) {
      return <Redirect {...redirect} />;
    }

    if (canActive) {
      return <Route {...restProps} />;
    }

    if (!canActive) {
      return <Redirect to={redirectBackTo || ''} />;
    }
  }, [canActive, redirectBackTo, redirect, restProps]);

  return <>{elements}</>;
};

export default LqhRoute;
