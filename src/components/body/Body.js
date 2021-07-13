import "./Body.module.css";
import React from "react";
import { Fragment } from "react";
import PropTypes from 'prop-types';


const Body = ({ children }) => {
  return (
    <Fragment>
      <div className="body"> {children}</div>
    </Fragment>
  );
};

Body.propTypes = {
  children: PropTypes.object,
};
export default Body;
