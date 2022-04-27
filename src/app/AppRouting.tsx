import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Auth from '@features/Auth';
import { getMe } from '@features/Auth/authSlice';
import { useAuthGuard } from '@guards/useAuthGuard';
import { Shell } from '@shared/components';
import PageNotFound from '@shared/components/PageNotFound';
import { AuthenticateRoute } from '@shared/components/Routers/AuthenticateRoute';
import { useDispatch } from '@store';
import Features from '@features';

const AppRouting: React.FunctionComponent = () => {
  const checkAuth = useAuthGuard();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const doGetMe = async () => {
      try {
        await dispatch(getMe()).unwrap();
      } catch (error) {
        navigate('/login', { replace: true });
      }
    };
    doGetMe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Routes>
      <Route path="login" element={<Auth />} />

      <Route element={<AuthenticateRoute component={Shell} canActivate={[checkAuth]} />}>
        <Route path="/*" element={<AuthenticateRoute component={Features} />} />
      </Route>

      <Route path="page-not-found" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouting;
