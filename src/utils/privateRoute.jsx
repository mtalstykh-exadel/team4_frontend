import React from "react";
import propTypes from "prop-types";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  const auth = useSelector((state) => state.login.isAuth);
  console.log(auth);
  return (
    <Route
      {...props}
      render={({ location }) => auth ? (props.children) : (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )
      }
    />
  );
};
PrivateRoute.propTypes = {
  children: propTypes.func,
};

export default PrivateRoute;
