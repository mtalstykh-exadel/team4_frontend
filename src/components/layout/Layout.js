import "./Layout.module.css";
import React from "react";
import {PropTypes} from "@material-ui/core";

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
