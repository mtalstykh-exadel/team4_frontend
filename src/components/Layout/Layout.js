import "./Layout.scss";
import React from "react";
import { PropTypes } from "prop-types";
import Header from '../../components/header/header';

const Layout = ({ pageWrapperClass, children }) => {
  return (
    <>
      <Header/>
      <main className={pageWrapperClass}>
        {children}
      </main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.array,
  pageWrapperClass: PropTypes.string,
};

export default Layout;
