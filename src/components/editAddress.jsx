import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { list } from "../assests/states";
import add from "../css/profile.module.css";
import { selectAddressToEdit } from "../store/auth-slice";
import Dropdown from "./dropdown";
import InputField from "./InputField";

const EditAddress = () => {
  const addressTo = useSelector(selectAddressToEdit);
  const [values, setValues] = useState({
    addressName: addressTo && addressTo.addressName,
    additional: addressTo && addressTo.additional,
    state: addressTo && addressTo.state,
    city: addressTo && addressTo.city,
  });
  const states = Object.keys(list);
  const LGA = addressTo && list[values.state];

  const dispatch = useDispatch();

  const handleSelectState = (state) => {
    values.state = state;
  };

  const handleSelectLGA = (state) => {
    values.city = state;
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const doSubmit = () => {
    console.log(values);
    // dispatch(updateUserAddress(values));
  };

  return (
    <div className={add.address__form}>
      <form className={add.form}>
        <div className={add.address__input__layer}>
          <InputField
            style={add.field}
            autoFocus={true}
            label="Address"
            autocomplete="off"
            required={true}
            value={values.addressName}
            onChange={handleChange("addressName")}
          />
          <InputField
            style={add.field}
            label="Additional Info"
            required={true}
            value={values.additional}
            onChange={handleChange("additional")}
          />
        </div>
        <div className={add.address__input__layer}>
          {states && (
            <Dropdown
              label="State"
              value={values.state}
              drop={states}
              handle={handleSelectState}
              styling={add.field}
            />
          )}
          {LGA && (
            <Dropdown
              label="City"
              value={values.city}
              drop={LGA}
              handle={handleSelectLGA}
              styling={add.field}
            />
          )}
        </div>
      </form>
      <button className={add.address__btn} onClick={doSubmit}>
        UPDATE
      </button>
    </div>
  );
};

export default EditAddress;
