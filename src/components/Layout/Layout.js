import "./Layout.scss";
import '../../styles/theme.scss';
import React from "react";

import { PropTypes } from "prop-types";
import Header from '../header/header';

const Layout = ({ pageWrapperClass, children }) => {
  return (
    <div className="base-color">
      <Header/>
      <main className={`${pageWrapperClass} base-color`}>
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
