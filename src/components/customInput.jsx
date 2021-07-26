import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";

const CssOutline = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "rgb(119, 24, 24)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(119, 24, 24)",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      // "&:hover fieldset": {
      //   borderColor: "yellow",
      // },
      "&.Mui-focused fieldset": {
        borderColor: "rgb(119, 24, 24)",
      },
    },
  },
})(FormControl);

const CssTextField = withStyles({
  root: {
    width: 340,
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

// const useStyles = makeStyles((theme) => ({
//   textField: {
//     width: "90ch",
//   },
// }));

const CustomInput = ({
  label,
  resetFError,
  error,
  labelError,
  handleChange,
  values,
  type,
}) => {
  return (
    <div>
      <CssTextField
              label={label}
              disabled
        autoFocus
        required
        type={type}
        onBlur={resetFError}
        variant="outlined"
        id="custom-css-outlined-input"
        helperText={labelError}
        error={error}
        value={values}
        onChange={handleChange}
      />
    </div>
  );
};

export default CustomInput;

