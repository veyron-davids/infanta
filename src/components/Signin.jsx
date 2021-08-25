import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Snackbar from "@material-ui/core/Snackbar";
import {
  createMuiTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import sign from "../css/account.module.css";
import SignIn from "../mobile/pages/SignIn";
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
const CssOutline = withStyles({
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
})(FormControl);
const CssChecked = withStyles({
  root: {
    "& label": {
      fontSize: "10px",
    },
    "& body1": {
      fontSize: "10px",
    },
  },
})(FormControlLabel);

const GreenCheckbox = withStyles({
  root: {
    color: "#bd281c;",
    fontSize: "0.875px",
    "&$checked": {
      color: "#bd281c;",
      fontSize: "0.875px",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiTypography: {
      body1: {
        fontSize: "0.875rem",
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: "1.2rem",
        fill: "#bd281c;",
      },
    },
    PrivateSwitchBase: {
      root: {
        padding: "6px",
      },
    },
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Signin = (props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
    checker: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeCheck = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const resetPassError = () => {
    setPasswordError(null);
  };
  const resetMailError = () => {
    setEmailError(null);
  };

  const displayError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const getloginDetails = () => {
    const nEmail = localStorage.getItem("nemail");
    const nPassword = localStorage.getItem("npassword");
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (nEmail && nPassword) {
      setValues({
        email: nEmail,
        password: nPassword,
      });
      // localStorage.removeItem("nemail");
      // localStorage.removeItem("npassword");
      return;
    } else if (storedEmail && storedPassword) {
      setValues({
        email: storedEmail,
        password: storedPassword,
      });
      return;
    }
  };

  useEffect(() => {
    getloginDetails();
  }, []);

  const doSubmit = async (event) => {
    event.preventDefault();
    if (values.checker == true) {
      localStorage.setItem("email", values.email);
      localStorage.setItem("password", values.password);
    }
    setLoading(true);
    setEmailError(null);
    setPasswordError(null);
    try {
      if (values.email.trim().length === 0) {
        setEmailError("This field is required");
        return;
      } else if (values.password.trim().length === 0) {
        setPasswordError("This field is required");
        return;
      } else {
        const response = await auth.login(values.email, values.password);
        console.log(response);
        const { state } = props.location;
        window.location = state ? state.from.pathname : "/";

        setLoading(false);
      }
    } catch (err) {
      // setValidationError();
      if (err) {
        setError(true);
        setEmailError("Invalid Email or Password");
      }
    }
  };

  return (
    <React.Fragment>
      <div className={sign.container__two}>
        {error && (
          <Snackbar open={error} autoHideDuration={2000} onClose={displayError}>
            <Alert onClose={displayError} severity="error">
              Something went wrong
            </Alert>
          </Snackbar>
        )}
        <div className={sign.signin__cont}>
          <div className={sign.sign__title}>
            <span>Account Login </span>
          </div>
          <div className={sign.sign__in__container}>
            <form className={sign.form}>
              <CssTextField
                className={sign.field}
                autoFocus
                label="Email Address"
                variant="outlined"
                required
                id="custom-css-outlined-input"
                onBlur={resetMailError}
                value={values.email}
                onChange={handleChange("email")}
                helperText={emailError}
                error={emailError != null}
              />
              <br />
              <ThemeProvider theme={theme}>
                <CssOutline variant="outlined" required>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    className={sign.field}
                    required
                    onBlur={resetPassError}
                    helperText={passwordError}
                    error={passwordError != null}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={88}
                  />
                </CssOutline>
              </ThemeProvider>
            </form>
            <div className={sign.reset}>
              <ThemeProvider theme={theme}>
                <CssChecked
                  control={
                    <GreenCheckbox
                      checked={values.checker}
                      onChange={handleChangeCheck}
                      name="checker"
                    />
                  }
                  label="Remember me"
                />
              </ThemeProvider>
              <Link
                to="/reset"
                style={{ textDecoration: "none", color: "#dc143c" }}
              >
                <span>Forgot password?</span>
              </Link>
            </div>
            <button className={sign.custom__button__in} onClick={doSubmit}>
              SIGN IN
            </button>
            <div className={sign.details}>
              <span>Don't have an account?</span>
              <Link
                to="/account/signup"
                style={{ textDecoration: "none", color: "#dc143c" }}
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <SignIn />
    </React.Fragment>
  );
};

export default Signin;
