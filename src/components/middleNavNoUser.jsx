import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logos } from "../assests/Infantas.svg";
import two from "../css/middleNav.module.css"

const MiddleNavNoUser = () => {
  return (
    <div className={two.nav}>
      <NavLink
        to="/home/collections"
        id={two.li}
        style={{ textDecoration: "none" }}
      >
        <div className={two.logo}>
          <span className={two.logo}>
            <Logos />
          </span>
        </div>
      </NavLink>
      <ul id={two.ul}>
        <NavLink to="/account/signin" id={two.li} style={{ textDecoration: "none" }}>
          <li>Login</li>
        </NavLink>
        <NavLink to="/account/signup" id={two.li} style={{ textDecoration: "none" }}>
          <li id={two.li}>Register</li>
        </NavLink>
        <NavLink to="/help" id={two.li} style={{ textDecoration: "none" }}>
          <li id={two.li}>Help</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default MiddleNavNoUser;
