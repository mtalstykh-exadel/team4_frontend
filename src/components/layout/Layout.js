import "./Layout.scss";
import '../theme/theme.scss';
import React from "react";

import { PropTypes } from "prop-types";
import Header from '../../components/header/header';

const Layout = ({children}) => {
  return (
    <>
      <Header/>
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
