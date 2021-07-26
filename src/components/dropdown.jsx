import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";

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
        borderColor: "#232f3e;",
      },
      // "&:hover fieldset": {
      //   borderColor: "#971a1a;",
      // },
      "&.Mui-focused fieldset": {
        borderColor: "#232f3e;",
      },
    },
  },
})(TextField);

const Dropdown = ({ drop, styling }) => {
  return (
    <CssTextField
      variant="outlined"
      className={styling}
      select
      //   defaultValue={values.quantity}
      SelectProps={{
        native: true,
      }}
      id="custom-css-outlined-input"
      //   value={values.quantity}
      //   onChange={handleChange("quantity")}
    >
      {drop.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value}
        </option>
      ))}
    </CssTextField>
  );
};

export default Dropdown;
