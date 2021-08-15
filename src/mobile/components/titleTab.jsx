import React from "react";
import { NavLink } from "react-router-dom";
import sign from "../../mobile/css/account.module.css";

const TitleTab = ({
  locationsOne,
  titleOne,
  locationsTwo,
  titletwo,
  styles,
}) => {
  return (
    <div className={sign.title} id={styles}>
      <NavLink
        to={locationsOne}
        className={sign.title__one}
        activeClassName={sign.active}
        style={{ textDecoration: "none" }}
      >
        <span>{titleOne}</span>
      </NavLink>
      <NavLink
        to={locationsTwo}
        className={sign.title__one}
        activeClassName={sign.active}
        style={{ textDecoration: "none" }}
      >
        <span>{titletwo}</span>
      </NavLink>
    </div>
  );
};

export default TitleTab;
