import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUser } from "../../store/auth-slice";
import AddressComp from "../components/addressComp";
import Footer from "../components/footer";
import ProfileTitle from "../components/profileTitle";
import SnackError from "../components/snackError";
import add from "../css/profile.module.css";

const AddressMobile = () => {
  const [openError, setOpenError] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (openError === true) {
      setTimeout(() => {
        setOpenError(false);
      }, 5000);
    }
  }, [openError]);

  return (
    <div className={add.address__container}>
      <div>
        {openError && <SnackError msg="Maximum number of address reached" />}
        <ProfileTitle locations="/profile" title="Addresses" />
        {user && user.address.length > 0 && (
          <div className={add.address__display}>
            <AddressComp UserAddress={user.address[0]} />
          </div>
        )}
        {user && user.address.length > 1 && (
          <div className={add.address__display__two}>
            <AddressComp UserAddress={user.address[1]} />
          </div>
        )}
      </div>
      {user && user.address.length === 0 && (
        <div className={add.noadd}>
          <span>You have no registered address</span>
        </div>
      )}
      <div>
        <div className={add.floating}>
          <NavLink
            to={`${
              user && user.address.length === 2
                ? "/profile/address/display"
                : "/profile/address/new"
            }`}
            onClick={() => {
              user && user.address.length === 2 && setOpenError(true);
            }}
          >
            <div className={add.floating__icon}>
              <FiPlus />
            </div>
          </NavLink>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddressMobile;
