import React from "react";
import layout from "./Layout.module.css";

const Layout = ({children}) => {
    return <div className={layout.container}>
      {children}
  </div>;
};

export default Layout;
