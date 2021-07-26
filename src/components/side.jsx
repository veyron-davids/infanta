import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import side from "../css/side.module.css";

const Side = () => {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading();
  };

  return (
    <div className={side.container}>
      <NavLink
        to="/home/collections"
        className={side.division__one}
        activeClassName={side.active}
        style={{ textDecoration: "none" }}
        onClick={handleLoading}
      >
        All Collections
      </NavLink>
      <NavLink
        to="/home/girls"
        className={side.division__one}
        activeClassName={side.active}
        style={{ textDecoration: "none" }}
        onClick={handleLoading}
      >
        Stylish Girls
      </NavLink>
      <NavLink
        to="/boys"
        className={side.division__two}
        activeClassName={side.active}
        style={{ textDecoration: "none"}}
        onClick={handleLoading}
      >
        Cool Boys
      </NavLink>
      <div className={side.division__three}>Vogue Ladies</div>
      <div className={side.division__four}>Solid Men</div>
    </div>
  );
};

export default Side;
