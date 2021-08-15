import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import details from "../css/profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./dropdown";
import { selectUser } from "../store/auth-slice";

const gender = ["---", "Male", "Female"];

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
  const user = useSelector(selectUser);
  const [emError, setEmerror] = useState();
  const [phError, setPherror] = useState();

  const [values, setValues] = useState({
    FirstName: user && user.FirstName,
    LastName: user && user.LastName,
    email: "",
    phoneNumber: "",
    gender: "",
    dob: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleGender = (state) => {
    values.gender = state;
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
        values.FirstName.trim().length === 0 ||
        values.LastName.trim().length === 0 ||
        values.email.trim().length === 0 ||
        values.phoneNumber.trim().length === 0
      ) {
        setEmerror("This field is required");
        setPherror("This field is required");
        return;
      } else {
        // const response = await auth.register(values);
        console.log(values);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={details.container__two}>
      <div className={details.address__content}>
        <div className={details.order__title}>
          Edit Your Personal Information
        </div>
        <div className={details.address__form}>
          <form className={details.form}>
            <div className={details.address__input__layer}>
              <CssTextField
                className={details.field}
                disabled
                label="First Name"
                variant="outlined"
                id="custom-css-outlined-input"
                value={values.FirstName}
                onChange={handleChange("FirstName")}
              />
              <CssTextField
                className={details.field}
                label="Last Name"
                disabled
                variant="outlined"
                id="custom-css-outlined-input"
                value={values.LastName}
                onChange={handleChange("LastName")}
              />
            </div>
            <div className={details.address__input__layer}>
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
                id="custom-css-outlined-input"
                value={values.phoneNumber}
                onChange={handleChange("phoneNumber")}
              />
            </div>
            <div className={details.address__input__layer}>
              <Dropdown
                drop={gender}
                styling={details.field}
                label="Gender"
                handle={handleGender}
              />
              <CssTextField
                className={details.field}
                autoFocus
                type="date"
                label="BirthDay"
                variant="outlined"
                id="custom-css-outlined-input"
                value={values.dob}
                onChange={handleChange("dob")}
              />
            </div>
            <button className={details.address__btn} onClick={doSubmit}>
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Details;
