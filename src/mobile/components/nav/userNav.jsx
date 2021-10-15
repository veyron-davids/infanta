import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiUserFollowLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { selectCartCount } from "../../../store/cart-slice";
import { toggleDrawer } from "../../../store/mobile-slice";
import MnavUser from "../../css/nav.module.css";

const UserNav = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartCount);
  return (
    <div className={MnavUser.container}>
      <div className={MnavUser.container__sec__one}>
        <GiHamburgerMenu
          id={MnavUser.burger}
          onClick={() => {
            dispatch(toggleDrawer());
          }}
        />
        {/* {location.pathname === "/account/signin" && (
          <NavLink to="/home/collections" style={{ textDecoration: "none" }}>
            <IoIosArrowRoundBack id={MnavUser.burger} />
          </NavLink>
        )} */}
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span id={MnavUser.logo}>Infanta</span>
        </NavLink>
      </div>
      <div className={MnavUser.container__sec__two}>
        <NavLink
          to="/profile"
          style={{ textDecoration: "none" }}
          activeClassName={MnavUser.active}
          className={MnavUser.navlink}
        >
          <RiUserFollowLine />
        </NavLink>
        <NavLink
          to="/cart/summary"
          style={{ textDecoration: "none" }}
          // activeClassName={MnavUser.active}
          className={MnavUser.navlink}
        >
          <HiOutlineShoppingCart />
        </NavLink>
        <div className={MnavUser.count}>{cartTotal === 0 ? 0 : cartTotal}</div>
      </div>
    </div>
  );
};

export default UserNav;
