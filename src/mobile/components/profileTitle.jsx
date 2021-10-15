import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useHistory } from "react-router-dom";
import inbox from "../css/profile.module.css";

const ProfileTitle = ({ title }) => {
  const history = useHistory();
  return (
    <div className={inbox.inbox__title}>
      <div onClick={() => history.goBack()}>
        <IoIosArrowRoundBack id={inbox.burger} />
      </div>
      <span>{title}</span>
    </div>
  );
};

export default ProfileTitle;
