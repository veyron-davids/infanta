import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assests/Infanta.svg";
import nav from "../css/nav.module.css";
import { isAuth } from "../store/auth-slice";
import { selectCartCount } from "../store/cart-slice";

const Nav = ({ one, two, three, four }) => {
  const currentUser = useSelector(isAuth);
  const cartTotal = useSelector(selectCartCount);

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
          to={`${currentUser ? "/profile/inbox" : "/account/signin"}`}
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
            <div className={nav.count}>{cartTotal === 0 ? 0 : cartTotal}</div>
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
