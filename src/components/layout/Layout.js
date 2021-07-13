import "./Layout.scss";
import React from "react";


const Layout = ({children}) => {
  return (
    <div>
      <main className="main"> {/* <Header/> */}
          {/*<{children}>*/}
      </main>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.object,
};
export default Layout;
