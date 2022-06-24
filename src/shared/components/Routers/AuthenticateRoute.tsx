import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { GuardHandler, GuardHandlerResult } from '@shared/types/guard.type';

const checkGuards = (canActivate: GuardHandler[]) => {
  let result = {
    authorized: true,
    navigateTo: '',
  } as GuardHandlerResult;

  for (const fn of canActivate) {
    result = fn();
    if (!result.authorized) {
      return result;
    }
  }

  return result;
};

export type AuthenticateRouteProps = { component: ComponentType } & { canActivate?: GuardHandler[] };

export const AuthenticateRoute: React.FunctionComponent<AuthenticateRouteProps> = (props) => {
  const { component: Component, canActivate = [] } = props;

  const guardsResult = checkGuards(canActivate);

  return guardsResult.authorized ? <Component /> : <Navigate to={guardsResult.navigateTo ?? ''} replace />;
};

export default AuthenticateRoute;
