import { RedirectProps, RouteProps } from "react-router-dom";

export type OmitNative<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P] };

export type RouteGuard = {
  canActive?: boolean;
  redirectBackTo?: string;
}

export type RouteConfig<T = any> = RouteProps<string> & OmitNative<T, keyof RouteProps> & {
  redirect?: RedirectProps;
  guard?: RouteGuard;
}