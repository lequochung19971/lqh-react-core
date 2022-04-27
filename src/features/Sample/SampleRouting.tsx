import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const SamplePage = lazy(() => import('./pages/SamplePage'));
const SampleDialogPage = lazy(() => import('./pages/SampleDialogPage'));
const SampleRouting: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<SamplePage />} />
      <Route path="dialog" element={<SampleDialogPage />} />
      <Route path="*" element={<Navigate replace to="/page-not-found" />} />
    </Routes>
  );
};

export default SampleRouting;
