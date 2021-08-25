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
      // "&:hover fieldset": {
      //   borderColor: "#971a1a;",
      // },
      "&.Mui-focused fieldset": {
        borderColor: "#bd281c;",
      },
    },
    marginTop: 16,
    textTransform: "capitalize",
  },
})(TextField);

const DropdownMobile = ({ drop, styling, label, handle, disabled, error, value }) => {
  return (
    <CssTextField
      variant="outlined"
      className={styling}
      select
      defaultValue={value}
      disabled={disabled}
      label={label}
      onChange={(e) => {
        handle(e.target.value);
      }}
      SelectProps={{
        native: true,
      }}
      id="custom-css-outlined-input"
      error={error}
    >
      {drop.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </CssTextField>
  );
};

export default React.memo(DropdownMobile);
