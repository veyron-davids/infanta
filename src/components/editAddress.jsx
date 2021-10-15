import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { list } from "../assests/states";
import add from "../css/profile.module.css";
import { selectAddressToEdit } from "../store/auth-slice";
import Dropdown from "./dropdown";
import InputField from "./InputField";

const EditAddress = () => {
  const addressTo = useSelector(selectAddressToEdit);
  const [addressName, setAddressName] = useState(null);
  const [additional, setAdditional] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const stateVal = addressTo && addressTo.state;
  const cityVal = addressTo && addressTo.city;
  const addressVal = addressTo && addressTo.addressName;
  const additionalVal = addressTo && addressTo.additional;
  const phoneVal = addressTo && addressTo.phoneNumber;
  const states = Object.keys(list);
  const LGA = addressTo && list[state ? state : stateVal];
  const [phError, setPherror] = useState();
  const [adError, setAderror] = useState();
  const [addError, setAdderror] = useState();

  const dispatch = useDispatch();

  const handleSelectState = (state) => {
    setState(state);
  };

  const handleSelectLGA = (state) => {
    setCity(state);
  };

  const resetPhError = () => {
    setPherror(null);
  };

  const resetAdError = () => {
    setPherror(null);
  };
  const resetAddError = () => {
    setPherror(null);
  };

  const doSubmit = (event) => {
    event.preventDefault();
    const values = {
      addressName: addressName ? addressName : addressVal,
      additional: additional ? additional : additionalVal,
      phoneNumber: phoneNumber ? phoneNumber : phoneVal,
      state: state ? state : stateVal,
      city: city ? city : cityVal,
    };

    if (values.phoneNumber.toString().trim().length !== 11) {
      setPherror("Enter a valid phone number");
      return;
    } else if (values.addressName.toString().trim().length === 0) {
      setAderror("This field is required");
      return;
    } else if (values.additional.toString().trim().length === 0) {
      setAdderror("This field is required");
      return;
    }
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
            onChange={(e) => setAddressName(e.target.value)}
            defaultValue={addressTo && addressTo.addressName}
            helperText={adError}
            error={adError != null}
            reset={resetAdError}
          />
          <InputField
            style={add.field}
            label="Additional Info"
            required={true}
            defaultValue={addressTo && addressTo.additional}
            onChange={(e) => setAdditional(e.target.value)}
            helperText={addError}
            error={addError != null}
            reset={resetAddError}
          />
          <InputField
            style={add.field}
            label="Phone Number"
            type="number"
            max={{ maxLength: 11 }}
            required={true}
            defaultValue={addressTo && addressTo.phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.slice(0, 12))}
            helperText={phError}
            error={phError != null}
            reset={resetPhError}
          />
        </div>
        <div className={add.address__input__layer}>
          {states && (
            <Dropdown
              label="State"
              value={state ? state : stateVal}
              drop={states}
              handle={handleSelectState}
              styling={add.field}
            />
          )}
          {LGA && (
            <Dropdown
              label="City"
              value={city ? city : cityVal}
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
