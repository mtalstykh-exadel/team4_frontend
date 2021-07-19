import "./Layout.scss";
import React from "react";

import { PropTypes } from "prop-types";
import Header from '../../components/header/header';

const Layout = ({children}) => {
  return (
    <>
      {<Header/>}
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
