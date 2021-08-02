import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.auth.isAuth);
  return (
    <Route {...rest} render={({ location }) => auth ? children : (
      <Redirect to={{ pathname: '/login', state: { from: location } }} />
    )} />
  );
};
PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PrivateRoute.array,
    PropTypes.object
  ])
};

export default PrivateRoute;
