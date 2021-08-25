import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { toggleDrawer } from "../../../store/mobile-slice";
import Mnav from "../../css/nav.module.css";

const NoUserNav = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  return (
    <div className={Mnav.container}>
      <div className={Mnav.container__sec__one}>
        {location.pathname === "/" && (
          <GiHamburgerMenu
            id={Mnav.burger}
            onClick={() => {
              dispatch(toggleDrawer());
            }}
          />
        )}

        {location.pathname === "/account/signin" && (
          <NavLink
            to="/"
            style={{ textDecoration: "none" }}
            className={Mnav.navlink}
          >
            <IoIosArrowRoundBack id={Mnav.burger} />
          </NavLink>
        )}
        {location.pathname === "/account/signup" && (
          <NavLink
            to="/"
            style={{ textDecoration: "none" }}
            className={Mnav.navlink}
          >
            <IoIosArrowRoundBack id={Mnav.burger} />
          </NavLink>
        )}
        <span id={Mnav.logo}>Infanta</span>
      </div>
      {location.pathname === "/account/signin" ||
      location.pathname === "/account/signup" ? (
        ""
      ) : (
        <div className={Mnav.container__sec__two}>
          <NavLink
            to="/account/signin"
            style={{ textDecoration: "none" }}
            className={Mnav.navlink}
          >
            <AiOutlineUser id={Mnav.burger} />
          </NavLink>
          <HiOutlineShoppingCart />
        </div>
      )}
    </div>
  );
};

export default NoUserNav;
