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
      "&:hover fieldset": {
        borderColor: "#bd281c;",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#bd281c;",
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
