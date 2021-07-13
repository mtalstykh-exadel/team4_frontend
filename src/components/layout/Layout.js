import "./Layout.scss";
import React from "react";
import { Fragment } from "react";


const Layout = ({children}) => {
  return (
    <Fragment>
      <main className="main">
        {/* <Header/> */}
          {/*<{children}>*/}
      </main>
    </Fragment>
  );
};
Layout.propTypes = {
  children: PropTypes.object,
};
export default Layout;
