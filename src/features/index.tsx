import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthenticateRoute } from '@shared/components/Routers/AuthenticateRoute';

const Sample = lazy(() => import('./Sample'));
const Employee = lazy(() => import('./Employee'));

const Features: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="sample" />} />
      <Route path="sample/*" element={<AuthenticateRoute component={Sample} />} />
      <Route path="employee/*" element={<AuthenticateRoute component={Employee} />} />

      <Route path="*" element={<Navigate replace to="/page-not-found" />} />
    </Routes>
  );
};

export default Features;
