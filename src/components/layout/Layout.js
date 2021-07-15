import "./Layout.scss";
import React from "react";
import {PropTypes} from "prop-types";

const Layout = ({children}) => {
  return (
    <>
      {/* <Header/> */}
      <main className="main">
        {children}
      </main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

export default Layout;
