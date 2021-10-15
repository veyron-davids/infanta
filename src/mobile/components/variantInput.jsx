import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";

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
      "&.Mui-focused fieldset": {
        borderColor: "#bd281c;",
      },
    },
    marginTop: 16,
    textTransform: "capitalize",
  },
})(TextField);

const VariantInput = ({
  style,
  autoFocus,
  disabled,
  required,
  value,
  handleChange,
  label,
  error,
  helperText,
  reset,
  type,
  max,
  defaultValue
}) => {
  return (
    <CssTextField
      className={style}
      autoFocus={autoFocus}
      label={label}
      variant="outlined"
      type={type}
      disabled={disabled}
      required={required}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      //   onChange={(e) => handleChange(e.target.value)}
      helperText={helperText}
      error={error}
      onBlur={reset}
      inputProps={max}
      defaultValue={defaultValue}
    />
  );
};

export default VariantInput;
