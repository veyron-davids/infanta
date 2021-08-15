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
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#232f3e;",
      },
    },
  },
})(TextField);

const InputField = ({
  style,
  autoFocus,
  required,
  value,
  onChange,
  label,
  error,
  helperText,
  reset,
}) => {
  return (
    <CssTextField
      className={style}
      autoFocus={autoFocus}
      label={label}
      variant="outlined"
      required={required}
      id="custom-css-outlined-input"
      value={value}
      onChange={onChange}
      helperText={helperText}
      error={error}
      onBlur={reset}
    />
  );
};

export default InputField;
