import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import top from "../css/navTop.module.css";

const NavTop = ({ one, two }) => {
  const currentUser = useSelector((state) => state.auth);

  return (
    <div className={top.nav__top}>
    { currentUser && <React.Fragment>
      <NavLink to="/signout" style={{ textDecoration: "none" }}>
        <span id={top.span}>{one}</span>
      </NavLink>
      <NavLink to="/wishlist" style={{ textDecoration: "none" }}>
        <span id={top.span}>{two}</span>
      </NavLink>
      </React.Fragment>}
    </div>
  );
};

export default NavTop;
