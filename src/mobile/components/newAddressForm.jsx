import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { list } from "../../assests/states";
import Dropdown from "../../components/dropdown";
import { CreateUserAddress, setNewAddress } from "../../store/auth-slice";
import add from "../css/profile.module.css";
import Buttons from "./button";
import SnackError from "./snackError";
import VariantInput from "./variantInput";

const NewAddressForm = () => {
  const [addError, setAddError] = useState();
  const [addTwoError, setAddTwoError] = useState();
  const [phError, setPhError] = useState();
  const [values, setValues] = useState({
    addressName: "",
    additional: "",
    phoneNumber: "",
    state: "Abia",
    city: "",
    default: false,
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const states = Object.keys(list);
  const [LGA, setLGA] = useState(list[values.state]);

  const handleSelectState = (state) => {
    values.state = state;
    setLGA(list[state]);
  };

  const handleSelectLGA = (state) => {
    values.city = state;
  };

  const handleAddressName = (state) => {
    values.addressName = state;
  };
  const handleAdditional = (state) => {
    values.additional = state;
  };
  const handlePhoneNumber = (state) => {
    values.phoneNumber = state;
  };

  const resetAddError = () => {
    setAddError(null);
  };
  const resetAddTwoError = () => {
    setAddTwoError(null);
  };
  const resetPhError = () => {
    setPhError(null);
  };

  const displayError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  useEffect(() => {
    if (error === true) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [error]);

  const doSubmit = (event) => {
     event.preventDefault();
    try {
      if (
        values.addressName.trim().length === 0 ||
        values.additional.trim().length === 0 ||
        values.phoneNumber.trim().length === 0
      ) {
        setAddError("This field is required");
        setAddTwoError("This field is required");
        setPhError("This field is required");
        return;
      } else if (values.phoneNumber.trim().length < 11) {
        setPhError("Enter a valid phone number");
        return;
      }
      setLoading(true);
      dispatch(CreateUserAddress(values)).then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          dispatch(setNewAddress({ data: values }));
        }
      });
      setLoading(false);
       history.goBack()
      window.location = "/profile/address/display";
    } catch (err) {
      setError(true);
    }
  };

  return (
    <React.Fragment>
      {error && <SnackError msg="Something went wrong!" />}
      <form className={add.address__form}>
        <VariantInput
          autoFocus
          label="Address"
          required={true}
          // value={values.addressName}
          handleChange={handleAddressName}
          helperText={addError}
          error={addError != null}
          reset={resetAddError}
        />
        <VariantInput
          label="Additional Info"
          required={true}
          // value={values.additional}
          handleChange={handleAdditional}
          helperText={addTwoError}
          error={addTwoError != null}
          reset={resetAddTwoError}
        />
        <br />
        <VariantInput
          label="Phone Number"
          required={true}
          // value={values.additional}
          handleChange={handlePhoneNumber}
          helperText={phError}
          error={phError != null}
          reset={resetPhError}
          max={{ maxLength: 11 }}
        />
        <br />
        {states && (
          <Dropdown
            label="State"
            drop={states}
            handle={handleSelectState}
            styling={add.field}
          />
        )}
        <br />
        {LGA && (
          <Dropdown
            label="City"
            drop={LGA}
            handle={handleSelectLGA}
            styling={add.field}
          />
        )}
        <br />
        <button
          className={add.but}
          onClick={doSubmit}
          disabled={loading}
          id={loading && add.opaque}
        >
          SAVE
        </button>
      </form>
    </React.Fragment>
  );
};

export default NewAddressForm;
