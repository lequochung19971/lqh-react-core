import React, { useMemo } from 'react';
import { Redirect, RedirectProps, Route } from 'react-router-dom';
import { RouteConfig } from '@shared/types';

const PrivateRoute: React.FunctionComponent<RouteConfig> = (props) => {
  const {
    guard: { canActive = true, redirectBackTo = '' } = {},
    redirectTo,
    redirectFrom,
    redirectPush,
    ...restProps
  } = props;

  const elements = useMemo(() => {
    if (redirectTo) {
      const redirect: RedirectProps = {
        to: redirectTo,
        from: redirectFrom,
        push: redirectPush,
        path: restProps.path as string,
        exact: restProps.exact,
        strict: restProps.strict,
      };
      return <Redirect {...redirect} />;
    }

    if (canActive) {
      return <Route {...restProps} />;
    }

    if (!canActive) {
      return <Redirect to={redirectBackTo || ''} />;
    }
  }, [canActive, redirectBackTo, redirectFrom, redirectPush, redirectTo, restProps]);

  return <>{elements}</>;
};

export default PrivateRoute;
