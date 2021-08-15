import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiUserFollowLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import nav from "../css/nav.module.css";
import { isAuth } from "../store/auth-slice";
import { selectCartCount } from "../store/cart-slice";

const Nav = ({ one, two, three, four }) => {
  const currentUser = useSelector(isAuth);
  const cartTotal = useSelector(selectCartCount);
  const location = useLocation();

  return (
    <div className={nav.nav}>
      <NavLink
        to="/home/collections"
        id={nav.li}
        style={{ textDecoration: "none" }}
      >
        <div className={nav.logo}>
          <span>
            {/* <Logo /> */}
            Infanta
          </span>
        </div>
      </NavLink>
      <ul id={nav.ul}>
        <NavLink
          to={`${currentUser ? "/profile/inbox" : "/account/signin"}`}
          id={nav.li__list}
          activeClassName={`${
            location.pathname == "/profile/inbox" && nav.active
          } ${nav.active}`}
          style={{ textDecoration: "none" }}
        >
          {currentUser ? (
            <span id={nav.spanner}>
              <RiUserFollowLine id={nav.iconner} /> <li>{one}</li>
            </span>
          ) : (
            <span id={nav.spanner}>
              <AiOutlineUser id={nav.iconner} /> <li>{one}</li>
            </span>
          )}
        </NavLink>
        {!currentUser && (
          <NavLink
            to={`${"/account/signup"}`}
            id={nav.li__list}
            activeClassName={`${
              location.pathname == "/account/signup" && nav.active
            } ${nav.active}`}
            style={{ textDecoration: "none" }}
          >
            <span id={nav.spanner}>
              <AiOutlineUser id={nav.iconner} /> <li>{two}</li>
            </span>
          </NavLink>
        )}
        <NavLink
          to="/help"
          id={nav.li__list}
          activeClassName={`${location.pathname == "/help" && nav.active} ${
            nav.active
          }`}
          style={{ textDecoration: "none" }}
        >
          <span id={nav.spanner}>
            <BiHelpCircle id={nav.iconner} /> <li>{three}</li>
          </span>
        </NavLink>
        {four === "four" && (
          <NavLink
            to="/cart/summary"
            id={nav.li__list}
            activeClassName={`${
              location.pathname == "/cart/summary" && nav.active
            } ${nav.active}`}
            style={{ textDecoration: "none" }}
          >
            <div className={nav.count}>{cartTotal === 0 ? 0 : cartTotal}</div>
            <li>
              <span id={nav.spanner}>
                <HiOutlineShoppingCart id={nav.iconner} className={nav.shake} />{" "}
                <li>Cart</li>
              </span>
            </li>
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default Nav;
