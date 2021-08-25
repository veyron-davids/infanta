import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {
  createTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";

const CssOutline = withStyles({
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
      //   borderColor: "yellow",
      // },
      "&.Mui-focused fieldset": {
        borderColor: "#bd281c;",
      },
    },
    marginTop: 16,
  },
})(FormControl);

const theme = createTheme({
  overrides: {
    MuiSvgIcon: {
      root: {
        fill: "#bd281c;",
      },
    },
  },
});

const PasswordInput = ({
  onBlur,
  helperText,
  error,
  value,
  handleChange,
  style,
}) => {
  const [values, setValues] = useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <CssOutline variant="outlined" helperText={helperText} >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={values.showPassword ? "text" : "password"}
        className={style}
        onBlur={onBlur}
        error={error}

        value={value}
        onChange={(e) => handleChange(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <ThemeProvider theme={theme}>
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </ThemeProvider>
          </InputAdornment>
        }
        labelWidth={75}
      />
    </CssOutline>
  );
};

export default PasswordInput;
