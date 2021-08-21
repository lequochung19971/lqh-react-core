import { Route } from 'react-router-dom';
import { RouteConfig } from '@shared/types';

const PublicRoute: React.FunctionComponent<RouteConfig> = (props) => {
  return <Route {...props} />;
};

export default PublicRoute;
