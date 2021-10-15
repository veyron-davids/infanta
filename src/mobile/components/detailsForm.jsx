import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Spinner } from "../../assests/spinner.svg";
import DropdownMobile from "../../mobile/components/dropDown";
import { selectUser } from "../../store/auth-slice";
import detail from "../css/profile.module.css";
import Buttons from "./button";
import VariantInput from "./variantInput";

const gender = ["---", "Male", "Female"];

const DetailsForm = () => {
  const user = useSelector(selectUser);
  const [emError, setEmerror] = useState();
  const [phError, setPherror] = useState();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    FirstName: user && user.FirstName,
    LastName: user && user.LastName,
    email: "",
    phoneNumber: null,
    gender: "",
    dob: "",
  });

  const handleEmail = (state) => {
    values.email = state;
  };
  const handlePhone = (state) => {
    values.phoneNumber = state;
  };

  const handleGender = (state) => {
    values.gender = state;
  };

  const handleDOB = (state) => {
    values.dob = state;
  };

  const resetMailError = () => {
    setEmerror(null);
  };
  const resetPhError = () => {
    setPherror(null);
  };

  const doSubmit = async (e) => {
    e.preventDefault();
    setEmerror(null);
    setPherror(null);
    try {
      if (
        values.email.trim().length === 0 ||
        values.phoneNumber.trim().length === 0
      ) {
        setEmerror("This field is required");
        setPherror("This field is required");
        return;
      } else if (values.phoneNumber.trim().length < 11) {
        setPherror("Enter a valid phone number");
        return;
      } else {
        setLoading(true);
        console.log(values);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={detail.detail__container__form}>
      <VariantInput disabled label="First Name" value={values.FirstName} />
      <VariantInput disabled label="Last Name" value={values.LastName} />
      <VariantInput
        reset={resetMailError}
        label="Email"
        handleChange={handleEmail}
        helperText={emError}
        error={emError != null}
      />
      <VariantInput
        reset={resetPhError}
        type="number"
        label="Phone Number"
        max={{ maxLength: 11 }}
        handleChange={handlePhone}
        helperText={phError}
        error={phError != null}
      />
      <DropdownMobile drop={gender} label="Gender" handle={handleGender} />
      <VariantInput
        label="Bithday"
        autoFocus
        type="date"
        handleChange={handleDOB}
      />
      <Buttons style={detail.buttons} onClick={doSubmit} disabled={loading}>
        {loading ? <Spinner /> : "SUBMIT"}
      </Buttons>
    </form>
  );
};

export default DetailsForm;
