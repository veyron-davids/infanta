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
  style,
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
        className={style}
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
