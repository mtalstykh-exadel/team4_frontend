import React from "react";
import { PropTypes } from "prop-types";

import "./Layout.scss";

import Header from '../header/header';

const Layout = ({ pageWrapperClass, children }) => {
  return (
    <div>
      <Header/>
      <main className={pageWrapperClass}>
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  pageWrapperClass: PropTypes.string,
};

export default Layout;
