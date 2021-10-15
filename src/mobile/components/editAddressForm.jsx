import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { list } from "../../assests/states";
import Dropdown from "../../components/dropdown";
import { selectAddressToEdit } from "../../store/auth-slice";
import add from "../css/profile.module.css";
import VariantInput from "./variantInput";

const EditAddressForm = () => {
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
  const [adError, setAderror] = useState();
  const [addError, setAdderror] = useState();
  const [phError, setPherror] = useState();

  const dispatch = useDispatch();

  const handleSelectState = (state) => {
    setState(state);
  };

  const handleSelectLGA = (state) => {
    setCity(state);
  };
  const handleAddressName = (state) => {
    setAddressName(state);
  };
  const handlePhoneNumber = (state) => {
    setPhoneNumber(state.slice(0, 12));
  };
  const handleAdditional = (state) => {
    setAdditional(state);
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
    } else if (
      values.addressName.toString().trim().length === 0 ||
      values.additional.toString().trim().length === 0
      ) {
      setAdderror("This field is required");
      setAderror("This field is required");
      return;
    } 
    console.log(values);
    // dispatch(updateUserAddress(values));
  };

  const gen =  () => {
const cards = ["j", 5, 7, 6, 8, 4, "k", 2, 3, 9, "q"];
      
  }

  return (
    <form className={add.address__form}>
      <VariantInput
        autoFocus
        label="Address"
        required={true}
        defaultValue={addressTo && addressTo.addressName}
        handleChange={handleAddressName}
        helperText={adError}
        error={adError != null}
        reset={resetAdError}
      />
      <VariantInput
        autoFocus
        label="Additional"
        required={true}
        defaultValue={addressTo && addressTo.additional}
        handleChange={handleAdditional}
        helperText={addError}
        error={addError != null}
        reset={resetAddError}
      />
      <VariantInput
        autoFocus
        label="Phone Number"
        type="number"
        required={true}
        defaultValue={addressTo && addressTo.phoneNumber}
        handleChange={handlePhoneNumber}
        max={{ maxLength: 11 }}
        helperText={phError}
        error={phError != null}
        reset={resetPhError}
      />
      <br />
      {states && (
        <Dropdown
          label="State"
          value={state ? state : stateVal}
          drop={states}
          handle={handleSelectState}
          styling={add.field}
        />
      )}
      <br />
      {LGA && (
        <Dropdown
          label="City"
          value={city ? city : cityVal}
          drop={LGA}
          handle={handleSelectLGA}
          styling={add.field}
        />
      )}
      <br />
      <button className={add.but} onClick={doSubmit}>
        SAVE
      </button>
    </form>
  );
};

export default EditAddressForm;
