import "./Layout.scss";
import '../../styles/theme.scss';
import React from "react";

import { PropTypes } from "prop-types";
import Header from '../../components/header/header';

const Layout = ({children}) => {
  return (
    <div className="base-color">
      <Header/>
      <main className="main base-color">
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.array,
};

export default Layout;
