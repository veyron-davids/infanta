import React from "react";
import { VscClose } from "react-icons/vsc";
import full from "../../mobile/css/fullOverlay.module.css";
import { useSelector, useDispatch } from "react-redux";
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
          <div className={full.drawer__one}>All Collections</div>
          <div className={full.drawer__two}>Stylish Girls</div>
          <div className={full.drawer__three}>Cool Boys</div>
          <div className={full.drawer__four}>Vogue Ladies</div>
          <div className={full.drawer__five}>Solid Men</div>
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
