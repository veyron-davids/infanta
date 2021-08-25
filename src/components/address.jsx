import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import add from "../css/profile.module.css";
import ProtectedRoute from "../services/protectedRoute";
import { selectUser } from "../store/auth-slice";
import DisplayedAddress from "./displayedAddress";
import EditAddress from "./editAddress";
import NewAddress from "./newAddress";

const Address = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const [openError, setOpenError] = useState(false);

  const displayError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div className={add.container__two}>
      {openError && (
        <Snackbar
          open={openError}
          autoHideDuration={2000}
          onClose={displayError}
        >
          <Alert onClose={displayError} severity="error">
            Maximum number of address reached!
          </Alert>
        </Snackbar>
      )}
      <div className={add.address__content}>
        {location.pathname === "/profile/address/new" && (
          <div className={add.order__title}>
            <NavLink
              to="/profile/address/display"
              id={add.back__icon}
              style={{ textDecoration: "none" }}
            >
              <IoIosArrowRoundBack />
            </NavLink>
          </div>
        )}
        {location.pathname === "/profile/address/edit" && (
          <div className={add.order__title}>
            <NavLink
              to="/profile/address/display"
              id={add.back__icon}
              style={{ textDecoration: "none" }}
            >
              <IoIosArrowRoundBack />
            </NavLink>
          </div>
        )}
        {location.pathname === "/profile/address/display" && (
          <div className={add.address__title}>
            <NavLink
              to={`${
                user && user.address.length === 2
                  ? "/profile/address/display"
                  : "/profile/address/new"
              }`}
              className={add.address__button}
              style={{ textDecoration: "none" }}
              onClick={() => {
                user && user.address.length === 2 && setOpenError(true);
              }}
            >
              NEW ADDRESS
            </NavLink>
          </div>
        )}

        {location.pathname === "/profile/address/new"
          ? ""
          : user &&
            user.address.length === 0 && (
              <span id={add.empty}>You have no registered address</span>
            )}

        <ProtectedRoute
          path="/profile/address/display"
          component={DisplayedAddress}
        />
        <ProtectedRoute path="/profile/address/new" component={NewAddress} />
        <ProtectedRoute path="/profile/address/edit" component={EditAddress} />
      </div>
    </div>
  );
};

export default Address;
