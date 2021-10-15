import React from "react";
import { IoMdTrash } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  RemoveAddress,
  removeAddress,
  selectUser,
  setDefaultAdd,
  setDefaultAddress,
  getAddressToEdit,
} from "../../store/auth-slice";
import add from "../css/profile.module.css";

const AddressComp = ({ UserAddress }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()


  return (
    <React.Fragment>
      <div className={add.address__One}>
        <span>
          {user && user.FirstName} {user && user.LastName}
        </span>
        <span>{UserAddress && UserAddress.addressName}</span>
        <span>
          {UserAddress && UserAddress.city}, {UserAddress && UserAddress.state}
        </span>
        <span>{UserAddress && UserAddress.phoneNumber}</span>
        {UserAddress && UserAddress["default"] === true && (
          <span>Default Address</span>
        )}
      </div>
      <div className={add.address__two}>
        <div className={add.default}>
          <span
            className={
              UserAddress && UserAddress["default"] === true
                ? add.default__add
                : add.make__default
            }
            onClick={() => {
              // dispatch(setDefaultAdd({ data: UserAddress._id }));
              dispatch(setDefaultAddress({ data: UserAddress._id })).then(
                (data) => {
                  if (data.meta.requestStatus === "fulfilled") {
                    dispatch(setDefaultAdd({ data: UserAddress._id }));
                  }
                }
              );
            }}
          >
            MAKE DEFAULT
          </span>
        </div>
        <div className={add.edit}>
          <NavLink
            to="/profile/address/edit"
            id={add.edit__span}
            onClick={() => {
              dispatch(getAddressToEdit({ id: UserAddress._id }));
            }}
          >
            <span>
              <MdModeEdit />
            </span>
          </NavLink>
          <span>
            <IoMdTrash
              onClick={() => {
                dispatch(RemoveAddress(UserAddress._id))
                  .then((data) => {
                    if (data.meta.requestStatus === "fulfilled") {
                      dispatch(removeAddress({ id: UserAddress._id }));
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddressComp;
