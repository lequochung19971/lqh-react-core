import { RouteConfig } from '@shared/types';
import AuthenticateRoute from './AuthenticateRoute';

export const filterMainRoutes = (routes: RouteConfig[]) => {
  const isMainRoute = (route: RouteConfig) => !route?.unwrapped;
  return routes.filter(isMainRoute);
};

export const filterUnwrappedRoutes = (routes: RouteConfig[]) => {
  const isUnwrapped = (route: RouteConfig) => !!route?.unwrapped;
  return routes.filter(isUnwrapped);
};

export const renderRoutes = (routeConfigs: RouteConfig[]) => {
  if (!routeConfigs?.length) {
    return null;
  }

  return routeConfigs.map((route) => {
    return <AuthenticateRoute key={route.path as string} {...route} />;
  });
};