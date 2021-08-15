import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import inbox from "../css/profile.module.css";

const ProfileTitle = ({ locations, title }) => {
  return (
    <div className={inbox.inbox__title}>
      <NavLink to={locations}>
        <IoIosArrowRoundBack id={inbox.burger} />
      </NavLink>
      <span>{title}</span>
    </div>
  );
};

export default ProfileTitle;
