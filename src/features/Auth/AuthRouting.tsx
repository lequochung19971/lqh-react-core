import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { isLogged } from './utils';

export const AuthRouting: React.FunctionComponent = () => {
  const location = useLocation();

  if (/(\/auth)/.test(location.pathname) && isLogged()) {
    return <Navigate to={'/sample'} replace />;
  }

  return (
    <Routes>
      <Route index element={<Navigate replace to="login" />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Navigate replace to="/page-not-found" />} />
    </Routes>
  );
};
