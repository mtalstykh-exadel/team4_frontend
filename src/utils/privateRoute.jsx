import React from "react";
import { ReactComponentLike } from "prop-types";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.login.isAuth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};
PrivateRoute.propTypes = {
  children: ReactComponentLike,
};

export default PrivateRoute;
