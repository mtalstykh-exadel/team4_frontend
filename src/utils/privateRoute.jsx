import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.login.isAuth);
  return (
    <Route {...rest} render={({ location }) => auth ? children : (
      <Redirect to={{ pathname: "/login", state: { from: location } }} />
    )} />
  );
};
PrivateRoute.propTypes = {
  children: PropTypes.any,
};

export default PrivateRoute;
