import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logos } from "../assests/Infantas.svg";
import two from "../css/middleNav.module.css";

const MiddleNavUser = () => {
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
        <NavLink to="/profile" id={two.li} style={{ textDecoration: "none" }}>
          <li>Profile</li>
        </NavLink>
        <NavLink to="/orders" id={two.li} style={{ textDecoration: "none" }}>
          <li id={two.li}>Orders</li>
        </NavLink>
        <NavLink to="/help" id={two.li} style={{ textDecoration: "none" }}>
          <li id={two.li}>Help</li>
        </NavLink>
        <NavLink
          to="/cart/summary"
          id={two.cart}
          style={{ textDecoration: "none" }}
        >
          <li>
            <HiOutlineShoppingCart className={two.shake} />
          </li>
        </NavLink>
        <div className={two.count}>0</div>
      </ul>
    </div>
  );
};

export default MiddleNavUser;