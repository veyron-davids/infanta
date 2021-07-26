import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assests/Infanta.svg";
import { useSelector } from "react-redux";
import nav from "../css/nav.module.css";

const Nav = ({ one, two, three, four }) => {
 const currentUser = useSelector((state) => state.auth);

  return (
    <div className={nav.nav}>
      <NavLink
        to="/home/collections"
        id={nav.li}
        style={{ textDecoration: "none" }}
      >
        <div className={nav.logo}>
          <span className={nav.logo}>
            <Logo />
          </span>
        </div>
      </NavLink>
      <ul id={nav.ul}>
        <NavLink
          to={`${currentUser ? "/profile" : "/account/signin"}`}
          id={nav.li}
          style={{ textDecoration: "none" }}
        >
          <li>{one}</li>
        </NavLink>
        <NavLink
          to={`${currentUser ? "/orders" : "/account/signup"}`}
          id={nav.li}
          style={{ textDecoration: "none" }}
        >
          <li>{two}</li>
        </NavLink>
        <NavLink to="/help" id={nav.li} style={{ textDecoration: "none" }}>
          <li>{three}</li>
        </NavLink>
        {four === "four" && (
          <NavLink
            to="/cart/summary"
            id={nav.cart}
            style={{ textDecoration: "none" }}
          >
            <div className={nav.count}>0</div>
            <li>
              <HiOutlineShoppingCart className={nav.shake} />
            </li>
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default Nav;
