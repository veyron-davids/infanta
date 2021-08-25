import Snackbar from "@material-ui/core/Snackbar";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import sign from "../css/account.module.css";
import auth from "../services/authService";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#bd281c;",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#bd281c;",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#bd281c;",
      },
      "&:hover fieldset": {
        borderColor: "#bd281c;",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#bd281c;",
      },
    },
  },
})(TextField);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUp = () => {
  const [fError, setFerror] = useState();
  const [lError, setLerror] = useState();
  const [pError, setPerror] = useState();
  const [emError, setEmerror] = useState();

  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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
      const response = await auth.register(values);
      console.log(response);
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
      }
    }
  };

  return (
    <div className={sign.container__two}>
      {error && (
        <Snackbar open={error} autoHideDuration={2000} onClose={displayError}>
          <Alert onClose={displayError} severity="error">
            Something went wrong
          </Alert>
        </Snackbar>
      )}
      <div className={sign.signup__cont}>
        <div className={sign.sign__title}>
          <span>Create Account</span>
        </div>
        <div className={sign.sign__in__container}>
          <form className={sign.form}>
            <CssTextField
              className={sign.field}
              autoFocus
              onBlur={resetFError}
              label="First Name"
              variant="outlined"
              required
              id="custom-css-outlined-input"
              value={values.FirstName}
              onChange={handleChange("FirstName")}
              helperText={fError}
              error={fError != null}
            />
            <br />
            <CssTextField
              className={sign.field}
              onBlur={resetLError}
              label="Last Name"
              variant="outlined"
              required
              id="custom-css-outlined-input"
              value={values.LastName}
              onChange={handleChange("LastName")}
              helperText={lError}
              error={lError != null}
            />
            <br />
            {/* <CssTextField
              className={sign.field}
              label="Phone Number"
              variant="outlined"
              id="custom-css-outlined-input"
              value={values.phoneNumber}
              onChange={handleChange("phoneNumber")}
            />
            <br /> */}
            <CssTextField
              className={sign.field}
              onBlur={resetMailError}
              label="Email Address"
              variant="outlined"
              required
              id="custom-css-outlined-input"
              value={values.email}
              onChange={handleChange("email")}
              helperText={emError}
              error={emError != null}
            />
            <br />
            <CssTextField
              className={sign.field}
              onBlur={resetPassError}
              type="password"
              label="Password"
              variant="outlined"
              required
              id="custom-css-outlined-input"
              value={values.password}
              onChange={handleChange("password")}
              helperText={pError}
              error={pError != null}
            />
          </form>
          <button className={sign.custom__button__in} onClick={doSubmit}>
            SIGN UP
          </button>
          <div className={sign.details}>
            <span>Aleady have an account? </span>
            <Link
              to="/account/signin"
              style={{ textDecoration: "none", color: "#dc143c" }}
            >
              Sign In Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
