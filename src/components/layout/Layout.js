import "./Layout.scss";
import React from "react";
import { PropTypes } from "prop-types";

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
  children: PropTypes.array,
};

export default Layout;
