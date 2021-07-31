import React from "react";
import { NavLink } from "react-router-dom";
import side from "../css/side.module.css";

const Side = ({ data }) => {
  return (
    <div className={side.container}>
      <NavLink
        to={data.one.route}
        className={side.division__one}
        activeClassName={side.active}
        style={{ textDecoration: "none" }}
      >
        {data.one.label}
      </NavLink>
      <NavLink
        to={data.two.route}
        className={side.division__one}
        activeClassName={side.active}
        style={{ textDecoration: "none" }}
      >
        {data.two.label}
      </NavLink>
      <NavLink
        className={side.division__two}
        to={data.three.route}
        activeClassName={side.active}
        style={{ textDecoration: "none" }}
      >
        {data.three.label}
      </NavLink>
      <NavLink
        className={side.division__three}
        to={data.four.route}
        activeClassName={side.active}
        style={{ textDecoration: "none" }}
      >
        {data.four.label}
      </NavLink>
      <NavLink
        className={side.division__four}
        to={data.five.route}
        activeClassName={side.active}
        style={{ textDecoration: "none" }}
      >
        {data.five.label}
      </NavLink>
    </div>
  );
};

export default Side;
