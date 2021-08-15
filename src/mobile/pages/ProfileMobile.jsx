import React from "react";
import { CgArrowRight, CgHeart, CgList, CgMail } from "react-icons/cg";
import { GrUserSettings } from "react-icons/gr";
import { RiLockPasswordLine } from "react-icons/ri";
import { TiLocationOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import prof from "../../mobile/css/profile.module.css";
import { selectOpen } from "../../store/mobile-slice";
import Footer from "../components/footer";
import FullOverlay from "../components/fullOverlay";
import UserNav from "../components/nav/userNav";

const ProfileMobile = () => {
  const open = useSelector(selectOpen);
  return (
    <React.Fragment>
      {open && <FullOverlay />}
      <div className={prof.container}>
        <UserNav />
        <div className={prof.header}>
          <span>Welcome, Abiola</span>
          <span>abiolaajileye@gmail.com</span>
        </div>
        <div className={prof.profile__list}>
          <NavLink
            to="/profile/inbox"
            className={prof.profile__item}
            style={{ textDecoration: "none" }}
          >
            <CgMail id={prof.icon} />
            <span>Inbox</span>
            <CgArrowRight id={prof.view} />
          </NavLink>
          <NavLink
            to="/profile/orders/open"
            className={prof.profile__item}
            style={{ textDecoration: "none" }}
          >
            <CgList id={prof.icon} />
            <span>Orders</span>
            <CgArrowRight id={prof.view} />
          </NavLink>
          <div className={prof.profile__item}>
            <CgHeart id={prof.icon} />
            <span>Wishlist</span>
            <CgArrowRight id={prof.view} />
          </div>
          <div className={prof.profile__item}>
            <GrUserSettings id={prof.icon} />
            <span>Details</span>
            <CgArrowRight id={prof.view} />
          </div>
          <div className={prof.profile__item}>
            <TiLocationOutline id={prof.icon} />
            <span>Address Book</span>
            <CgArrowRight id={prof.view} />
          </div>
          <div className={prof.profile__item}>
            <RiLockPasswordLine id={prof.icon} />
            <span>Change Password</span>
            <CgArrowRight id={prof.view} />
          </div>
        </div>
        <NavLink to="/signout" style={{ textDecoration: "none" }}>
          <div className={prof.logout}>LOGOUT</div>
        </NavLink>
        <div className={prof.footer}>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileMobile;
