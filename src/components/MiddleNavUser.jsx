import React from "react";
import { BiHelpCircle } from "react-icons/bi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiUserFollowLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logos } from "../assests/Infantas.svg";
import two from "../css/nav.module.css";
import { selectCartCount } from "../store/cart-slice";

const MiddleNavUser = () => {
  const cartTotal = useSelector(selectCartCount);
  return (
    <div className={two.nav__sec}>
      <NavLink
        to="/home/collections"
        id={two.li}
        style={{ textDecoration: "none" }}
      >
        <div className={two.logo}>
          <span className={two.logo} id={two.color}>
            {/* <Logos /> */}
            Infanta
          </span>
        </div>
      </NavLink>
      <ul id={two.ul}>
        <NavLink
          to="/profile/inbox"
          id={two.li__list}
          activeClassName={two.active}
          style={{ textDecoration: "none" }}
        >
          <span id={two.spanner__two}>
            <RiUserFollowLine id={two.iconner__two} /> <li>Profile</li>
          </span>
        </NavLink>
        <NavLink
          to="/help"
          id={two.li__list}
          activeClassName={two.active}
          style={{ textDecoration: "none" }}
        >
          <span id={two.spanner__two}>
            <BiHelpCircle id={two.iconner__two} /> <li>Help</li>
          </span>
        </NavLink>
        <NavLink
          to="/cart/summary"
          id={two.li__list}
          activeClassName={two.active}
          style={{ textDecoration: "none" }}
        >
          <li>
            <span id={two.spanner__two}>
              <HiOutlineShoppingCart
                id={two.iconner__two}
                className={two.shake}
              />{" "}
              <li>Cart</li>
            </span>
          </li>
        </NavLink>
        <div className={two.count__two}>{cartTotal === 0 ? 0 : cartTotal}</div>
      </ul>
    </div>
  );
};

export default MiddleNavUser;
