import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  default as address,
  default as password,
} from "../css/profile.module.css";
import { selectUser } from "../store/auth-slice";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#232f3e;",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#232f3e;",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      // "&:hover fieldset": {
      //   borderColor: "yellow",
      // },
      "&.Mui-focused fieldset": {
        borderColor: "#232f3e;",
      },
    },
  },
})(TextField);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Password = () => {
  const user = useSelector(selectUser);
  const [values, setValues] = useState({
    email: user && user.email,
    currentPassword: "",
    newpassword: "",
    confirmPassword: "",
  });
  const [emailError, setEmailError] = useState();
  const [cuError, setcuError] = useState();
  const [nwError, setnwError] = useState();
  const [cnError, setcnError] = useState();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const displayError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const resetemError = () => {
    setEmailError(null);
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
        values.email.trim().length === 0 ||
        values.currentPassword.trim().length === 0 ||
        values.newpassword.trim().length === 0 ||
        values.confirmPassword.trim().length === 0
      ) {
        setEmailError("This field is required");
        setcuError("This field is required");
        setnwError("This field is required");
        setcnError("This field is required");
        return;
      } else if (values.newpassword !== values.confirmPassword) {
        setnwError("Password do not match");
        setcnError("Password do not match");
      } else if (values.newpassword.trim().length < 6) {
        setnwError("Password cannot be less than six Characters");
      } else {
        // dispatch(updateAddress(values));
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={password.container__two}>
      {error && (
        <Snackbar open={error} autoHideDuration={2000} onClose={displayError}>
          <Alert onClose={displayError} severity="error">
            Something went wrong
          </Alert>
        </Snackbar>
      )}
      <div className={address.address__content}>
        <div className={address.order__title}> Change Your Password</div>
        <div className={address.address__form}>
          <form className={address.form}>
            <div className={address.address__input__layer}>
              <CssTextField
                className={address.field}
                disabled
                label="Email"
                variant="outlined"
                id="custom-css-outlined-input"
                value={values.email}
                onChange={handleChange("email")}
              />
              <CssTextField
                className={address.field}
                autoFocus
                label="Current Password"
                variant="outlined"
                type="password"
                required
                id="custom-css-outlined-input"
                value={values.currentPassword}
                onChange={handleChange("currentPassword")}
                helperText={cuError}
                error={cuError != null}
                onBlur={resetcuError}
              />
            </div>
            <div className={address.address__input__layer}>
              <CssTextField
                className={address.field}
                label="New Password"
                variant="outlined"
                type="password"
                required
                id="custom-css-outlined-input"
                value={values.newpassword}
                onChange={handleChange("newpassword")}
                helperText={nwError}
                error={nwError != null}
                onBlur={resetnwError}
              />
              <CssTextField
                className={address.field}
                label="Confirm Password"
                variant="outlined"
                type="password"
                required
                id="custom-css-outlined-input"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                helperText={cnError}
                error={cnError != null}
                onBlur={resetcnError}
              />
            </div>
            <button className={address.address__btn} onClick={doSubmit}>
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
