import { RouteConfig } from "core/types";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const LqhRoute: React.FunctionComponent<RouteConfig> = (props) => {
  const { guard: { canActive = true, redirectBackTo = '' } = {}, ...restProps } = props;
  
  return <>
    { canActive ? <Route {...restProps} /> : <Redirect to={redirectBackTo || ''} />}
  </>
};

export default LqhRoute;
