import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/auth-slice";
import pass from "../css/profile.module.css";
import Buttons from "./button";
import VariantInput from "./variantInput";

const PasswordEditForm = () => {
  const user = useSelector(selectUser);
  const [values, setValues] = useState({
    email: user && user.email,
    currentPassword: "",
    newpassword: "",
    confirmPassword: "",
  });
  const [cuError, setcuError] = useState();
  const [nwError, setnwError] = useState();
  const [cnError, setcnError] = useState();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleCpass = (state) => {
    values.currentPassword = state;
  };
  const handleNpass = (state) => {
    values.newpassword = state;
  };
  const handleConPass = (state) => {
    values.confirmPassword = state;
  };

  const resetcuError = () => {
    setcuError(null);
  };
  const resetnwError = () => {
    setnwError(null);
  };
  const resetcnError = () => {
    setcnError(null);
  };

  const doSubmit = (e) => {
    e.preventDefault();
    try {
      if (
        values.currentPassword.trim().length === 0 ||
        values.newpassword.trim().length === 0 ||
        values.confirmPassword.trim().length === 0
      ) {
        setcuError("This field is required");
        setnwError("This field is required");
        setcnError("This field is required");
        return;
      } else if (values.newpassword !== values.confirmPassword) {
        setnwError("Password do not match");
          setcnError("Password do not match");
           return;
      } else if (values.newpassword.trim().length < 6) {
          setnwError("Password cannot be less than six Characters");
           return;
      } else {
        console.log(values);
        // dispatch(updateAddress(values));
      }
    } catch (error) {
      setError(true);
    }
  };
  return (
    <form className={pass.address__form}>
      <VariantInput
        autoFocus
        disabled={true}
        label="Email"
        required={true}
        value={values.email}
      />
      <VariantInput
        label="Current Password"
        required={true}
        handleChange={handleCpass}
        helperText={cuError}
        error={cuError != null}
        reset={resetcuError}
      />
      <VariantInput
        label="New Password"
        required={true}
        handleChange={handleNpass}
        helperText={nwError}
        error={nwError != null}
        reset={resetnwError}
      />
      <VariantInput
        label="Confirm Password"
        required={true}
        handleChange={handleConPass}
        helperText={cnError}
        error={cnError != null}
        reset={resetcnError}
      />
      <br />
      <Buttons style={pass.but} onClick={doSubmit}>
        SAVE
      </Buttons>
    </form>
  );
};

export default PasswordEditForm;
