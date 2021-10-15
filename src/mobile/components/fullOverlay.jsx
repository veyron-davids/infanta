import React from "react";
import { VscClose } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import full from "../../mobile/css/fullOverlay.module.css";
import { toggleDrawer } from "../../store/mobile-slice";

const FullOverlay = ({ handleOpen }) => {
  const dispatch = useDispatch();
  return (
    <div className={full.container}>
      <div className={full.container__one}>
        <div className={full.container__one__inner}>
          <div className={full.container__sec__one}>
            <VscClose
              id={full.burger}
              onClick={() => {
                dispatch(toggleDrawer());
              }}
            />
            <span id={full.logo}>Infanta</span>
          </div>
        </div>
        <div className={full.container__one__drawer}>
          <NavLink
            to="/"
            style={{ textDecoration: "none" }}
            activeClassName={full.active}
            className={full.drawer__one}
            onClick={() => {
              dispatch(toggleDrawer());
            }}
          >
            All Collections
          </NavLink>
          <NavLink
            className={full.drawer__two}
            to="/home/girls-collections"
            style={{ textDecoration: "none" }}
            activeClassName={full.active}
          >
            Stylish Girls
          </NavLink>
          <NavLink
            className={full.drawer__three}
            to="/home/boys-collections"
            style={{ textDecoration: "none" }}
            activeClassName={full.active}
          >
            Cool Boys
          </NavLink>
          <NavLink
            className={full.drawer__four}
            to="/home/ladies-collections"
            style={{ textDecoration: "none" }}
            activeClassName={full.active}
          >
            Vogue Ladies
          </NavLink>
          <NavLink
            className={full.drawer__five}
            to="/home/men-collections"
            style={{ textDecoration: "none" }}
            activeClassName={full.active}
          >
            Solid Men
          </NavLink>
        </div>
      </div>
      <div
        className={full.container__two}
        onClick={() => {
          dispatch(toggleDrawer());
        }}
      ></div>
    </div>
  );
};

export default FullOverlay;
