import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Spinner } from "../../assests/spinner.svg";
import sign from "../../mobile/css/account.module.css";
import auth from "../../services/authService";
import Buttons from "./button";
import PasswordInput from "./passwordInput";
import VariantInput from "./variantInput";

const SignUpForm = () => {
  const [fError, setFerror] = useState();
  const [lError, setLerror] = useState();
  const [pError, setPerror] = useState();
  const [emError, setEmerror] = useState();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleFirst = (state) => {
    values.FirstName = state;
  };
  const handleLast = (state) => {
    values.LastName = state;
  };
  const handlePass = (state) => {
    values.password = state;
  };
  const handleEmail = (state) => {
    values.email = state;
  };

  const resetPassError = () => {
    setPerror(null);
  };
  const resetMailError = () => {
    setEmerror(null);
  };
  const resetFError = () => {
    setFerror(null);
  };
  const resetLError = () => {
    setLerror(null);
  };

  const displayError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const validate = (userData) => {
    for (let i = 0; i <= userData.data.errors.length; i++) {
      const err = userData.data.errors[i];
      console.log(err);
      if (err.param == "email") {
        setEmerror(err.msg);
      } else if (err.param == "FirstName") {
        setFerror(err.msg);
      } else if (err.param == "LastName") {
        setLerror(err.msg);
      } else if (err.param == "password") {
        setPerror(err.msg);
      } else {
        return;
      }
    }
  };

  const doSubmit = async () => {
    try {
      setEmerror(null);
      setFerror(null);
      setLerror(null);
      setPerror(null);
      setLoading(true);
      const response = await auth.register(values);
      setLoading(false);
      if (response.data.errors) {
        validate(response);
        return;
      }
      auth.loginWithJwt(response.headers["x-auth-token"]);
      localStorage.setItem("nemail", values.email);
      localStorage.setItem("npassword", values.password);
      history.push("/account/signin");
    } catch (err) {
      if (err) {
        setError(true);
        setLoading(false);
      }
    }
  };

  return (
    <form className={sign.sign__form}>
      <VariantInput
        label="First Name"
        autoFocus
        reset={resetFError}
        // value={values.FirstName}
        handleChange={handleFirst}
        helperText={fError}
        error={fError != null}
      />
      <VariantInput
        label="Last Name"
        reset={resetLError}
        // value={values.LastName}
        handleChange={handleLast}
        helperText={lError}
        error={lError != null}
      />
      <VariantInput
        reset={resetMailError}
        label="Email Address"
        // value={values.email}
        handleChange={handleEmail}
        helperText={emError}
        error={emError != null}
      />
      <PasswordInput
        handleChange={handlePass}
        onBlur={resetPassError}
        helperText={pError}
        error={pError != null}
      />
      <Buttons style={sign.buttons} onClick={doSubmit} disabled={loading}>
        {loading ? <Spinner /> : "CREATE ACCOUNT"}
      </Buttons>
    </form>
  );
};

export default SignUpForm;
