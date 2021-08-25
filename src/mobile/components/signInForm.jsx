import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  createTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { ReactComponent as Spinner } from "../../assests/spinner.svg";
import sign from "../../mobile/css/account.module.css";
import auth from "../../services/authService";
import PasswordInput from "../components/passwordInput";
import Buttons from "./button";
import VariantInput from "./variantInput";

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
    fontSize: "0.875rem",
    "&$checked": {
      color: "#bd281c;",
      fontSize: "0.875rem",
    },
    marginLeft: 10,
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const theme = createTheme({
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
        padding: "0px",
      },
    },
  },
});

const SignInForm = () => {
  const [values, setValues] = useState({
    Memail: "",
    Mpassword: "",
    showPassword: false,
    checker: false,
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
        Memail: nEmail,
        Mpassword: nPassword,
      });
      // localStorage.removeItem("nemail");
      // localStorage.removeItem("npassword");
      return;
    } else if (storedEmail && storedPassword) {
      setValues({
        Memail: storedEmail,
        Mpassword: storedPassword,
      });
      return;
    }
  };

  const handlePassChange = (state) => {
    setValues({ Mpassword: state });
  };

  const handleEmailChange = (state) => {
    setValues({ Memail: state });
  };

  useEffect(() => {
    getloginDetails();
  }, []);

  const doSubmit = async (event) => {
    event.preventDefault();
    if (values.checker === true) {
      localStorage.setItem("email", values.Memail);
      localStorage.setItem("password", values.Mpassword);
    }
    setLoading(true);
    setEmailError(null);
    setPasswordError(null);
    try {
      if (
        values.Memail.trim().length === 0 ||
        values.Mpassword.trim().length === 0
      ) {
        setEmailError("This field is required");
        setPasswordError("This field is required");
        return;
      } else {
        console.log(values);
        const response = await auth.login(values.Memail, values.Mpassword);
        window.location = "/";
        history.replace("/");
        setLoading(false);
      }
    } catch (err) {
      if (err) {
        setError(true);
        setEmailError("Invalid email or password");
        setLoading(false);
      }
    }
  };

  return (
    <form className={sign.sign__form}>
      <VariantInput
        autoFocus
        label="Email Address"
        reset={resetMailError}
        value={values.Memail}
        handleChange={handleEmailChange}
        helperText={emailError}
        error={emailError != null}
      />
      <PasswordInput
        handleChange={handlePassChange}
        reset={resetPassError}
        helperText={passwordError}
        error={passwordError != null}
        value={values.Mpassword}
      />
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
        <NavLink
          to="/reset"
          style={{ textDecoration: "none", color: "#232f3e" }}
        >
          <span>Forgot password?</span>
        </NavLink>
      </div>
      <Buttons style={sign.buttons} onClick={doSubmit} disabled={loading}>
        {loading ? <Spinner /> : "LOGIN"}
      </Buttons>
    </form>
  );
};

export default SignInForm;
