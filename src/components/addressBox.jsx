import React from "react";
import { HiPencil } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import add from "../css/profile.module.css";
import {
  selectUser,
  setDefaultAdd,
  setDefaultAddress,
  getAddressToEdit,
} from "../store/auth-slice";

const AddressBox = ({ UserAddress }) => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  return (
    <article className={add.address__box}>
      <div className={add.address__box__inner}>
        <div className={add.address__name}>
          {user.FirstName} {user.LastName}
        </div>
        <div>
          <span>{UserAddress.addressName}</span>
          <br />
          <span>
            {UserAddress.city}, {UserAddress.state}
          </span>
          <br />
        </div>
        <div>
          <span>{user.phoneNumber}</span>
        </div>
        {UserAddress.default === true && (
          <div id={add.default}>Default Address</div>
        )}
      </div>
      <div className={add.address__box__default}>
        <span
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
          id={UserAddress.default === false ? add.set__default : ""}
        >
          SET AS DEFAULT
        </span>
        <span>
          <NavLink
            to="/profile/address/edit"
            onClick={() => {
              dispatch(getAddressToEdit({ id: UserAddress._id }));
            }}
          >
            <HiPencil id={add.address__box__icon} />
          </NavLink>
        </span>
      </div>
    </article>
  );
};

export default AddressBox;
