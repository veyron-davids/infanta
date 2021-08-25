import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { RiUserFollowLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import one from "../css/nav.module.css";

const MiddleNavNoUser = () => {
  const location = useLocation();
  return (
    <div className={one.nav__sec}>
      <NavLink
        to="/"
        id={one.li}
        style={{ textDecoration: "none" }}
      >
        <div className={one.logo}>
          <span className={one.logo} id={one.color}>
            {/* <Logos /> */}
            Infanta
          </span>
        </div>
      </NavLink>
      <ul id={one.ul}>
        <NavLink
          to="/account/signin"
          id={one.li__list}
          activeClassName={one.active}
          style={{ textDecoration: "none" }}
        >
          <span id={one.spanner__two}>
            <AiOutlineUser id={one.iconner__two} /> <li>Login</li>
          </span>
        </NavLink>
        <NavLink
          to="/account/signup"
          id={one.li__list}
          activeClassName={one.active}
          style={{ textDecoration: "none" }}
        >
          <span id={one.spanner__two}>
            <AiOutlineUser id={one.iconner__two} /> <li>Register</li>
          </span>
        </NavLink>
        <NavLink
          to="/help"
          id={one.li__list}
          activeClassName={`${location.pathname == "/help" && one.active} ${
            one.active
          }`}
          style={{ textDecoration: "none" }}
        >
          <span id={one.spanner__two}>
            <BiHelpCircle id={one.iconner__two} /> <li>Help</li>
          </span>
        </NavLink>
      </ul>
    </div>
  );
};

export default MiddleNavNoUser;
