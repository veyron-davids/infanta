import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import details from "../css/profile.module.css";
import auth from "../services/authService";
import Dropdown from "./dropdown";

const gender = ["Male", "Female"];

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

const Details = () => {
  const [fError, setFerror] = useState();
  const [lError, setLerror] = useState();
  const [emError, setEmerror] = useState();
  const [phError, setPherror] = useState();

  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dob: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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
  const resetPhError = () => {
    setPherror(null);
  };

  const doSubmit = async () => {
    setEmerror(null);
    setFerror(null);
    setLerror(null);
    setPherror(null);
    try {
      if (
        values.FirstName.trim().length === 0 ||
        values.LastName.trim().length === 0 ||
        values.email.trim().length === 0 ||
        values.phoneNumber.trim().length === 0
      ) {
        setEmerror("This field is required");
        setLerror("This field is required");
        setFerror("This field is required");
        setPherror("This field is required");
        return;
      } else {
        const response = await auth.register(values);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={details.container__two}>
      <div className={details.details__content}>
        <form>
          <div className={details.details__input__layer}>
            <CssTextField
              className={details.field}
              
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
            <CssTextField
              className={details.field}
            
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
          </div>
          <div className={details.details__input__layer}>
            <CssTextField
              className={details.field}
            
              onBlur={resetMailError}
              label="Email"
              variant="outlined"
              required
              id="custom-css-outlined-input"
              value={values.email}
              onChange={handleChange("email")}
              helperText={emError}
              error={emError != null}
            />
            <CssTextField
              className={details.field}
             
              onBlur={resetPhError}
              label="Phone Number"
              variant="outlined"
              required
              id="custom-css-outlined-input"
              value={values.phoneNumber}
              onChange={handleChange("phoneNumber")}
              helperText={phError}
              error={phError != null}
            />
          </div>
          <div className={details.details__input__layer}>
            <Dropdown drop={gender} styling={details.field} label="Gender" />
            <CssTextField
              className={details.field}
              autoFocus
              type="date"
              onBlur={resetPhError}
              label="BirthDay"
              variant="outlined"
              id="custom-css-outlined-input"
              value={values.dob}
              onChange={handleChange("dob")}
              helperText={phError}
              error={phError != null}
            />
          </div>
        </form>
        <button className={details.custom__button__in} onClick={doSubmit}>
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default Details;
