import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const EmployeesPage = lazy(() => import('./pages/EmployeesPage'));
const EmployeesDetailPage = lazy(() => import('./pages/EmployeesDetailPage'));

const EmployeeRouting: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<EmployeesPage />} />
      <Route path="detail" element={<EmployeesDetailPage />} />
      <Route path="*" element={<Navigate replace to="/page-not-found" />} />
    </Routes>
  );
};

export default EmployeeRouting;
