import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";


const CssTextField = withStyles({
  root: {
    width: 340,
    color: "#232f3e;",
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
      "&.Mui-focused fieldset": {
        borderColor: "#232f3e;",
      },
    },
  },
})(TextField);

const DropTwo = ({ label, data, handleChange }) => {

  return (
    <CssTextField
      id="outlined-select-currency-native"
      select
      label={label}
      defaultValue
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      SelectProps={{
        native: true,
      }}
      //   helperText="Please select your currency"
      variant="outlined"
    >
      {data.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </CssTextField>
  );
};

export default DropTwo;
