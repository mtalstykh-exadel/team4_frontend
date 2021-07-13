import "./Layout.scss";
import React from "react";
import { Fragment } from "react";
import Body from '../body/Body.js';

const Layout = () => {
  return (
    <Fragment>
      <main className="main">
        {/* <Header/> */}
        <Body>Hello it is body</Body>
      </main>
    </Fragment>
  );
};

export default Layout;
