import React, { lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Auth from '@features/Auth';
import { getMe } from '@features/Auth/authSlice';
import { isLogged } from '@features/Auth/utils';
import { useAuthGuard } from '@guards/useAuthGuard';
import { Shell } from '@shared/components';
import PageNotFound from '@shared/components/PageNotFound';
import { AuthenticateRoute } from '@shared/components/Routers/AuthenticateRoute';

const Sample = lazy(() => import('../features/Sample'));
const Employee = lazy(() => import('../features/Employee'));
const User = lazy(() => import('../features/User'));

const AppRouting: React.FunctionComponent = () => {
  const checkAuth = useAuthGuard();

  return (
    <Routes>
      <Route path="auth/*" element={<Auth />} />

      <Route element={<AuthenticateRoute component={Shell} canActivate={[checkAuth]} />}>
        <Route index element={<Navigate replace to="sample" />} />
        <Route path="sample/*" element={<AuthenticateRoute component={Sample} canActivate={[checkAuth]} />} />
        <Route path="employee/*" element={<AuthenticateRoute component={Employee} canActivate={[checkAuth]} />} />
        <Route path="user/*" element={<AuthenticateRoute component={User} canActivate={[checkAuth]} />} />

        <Route path="*" element={<Navigate replace to="/page-not-found" />} />
      </Route>

      <Route path="page-not-found" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouting;
