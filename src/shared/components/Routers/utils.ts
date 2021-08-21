import { RouteConfig } from '@shared/types';

export const filterMainRoutes = (routes: RouteConfig[]) => {
  const isMainRoute = (route: RouteConfig) => !route?.unwrapped;
  return routes.filter(isMainRoute);
};

export const filterUnwrappedRoutes = (routes: RouteConfig[]) => {
  const isUnwrapped = (route: RouteConfig) => !!route?.unwrapped;
  return routes.filter(isUnwrapped);
};
