import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiUserFollowLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { toggleDrawer } from "../../../store/mobile-slice";
import { IoIosArrowRoundBack } from "react-icons/io";
import MnavUser from "../../css/nav.module.css";

const UserNav = () => {
  const location = useLocation();
  const dispatch = useDispatch();
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
        <NavLink to="/home/collections" style={{ textDecoration: "none" }}>
          <span id={MnavUser.logo}>Infanta</span>
        </NavLink>
      </div>
      <div className={MnavUser.container__sec__two}>
        <NavLink to="/profile" style={{ textDecoration: "none" }}>
          <RiUserFollowLine id={MnavUser.burger} />
        </NavLink>
        <HiOutlineShoppingCart />
      </div>
    </div>
  );
};

export default UserNav;
