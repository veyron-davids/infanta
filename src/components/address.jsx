import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import address from "../css/profile.module.css";
import {
  getLGA,
  getState,
  selectDelivery,
  selectLGA,
  selectStates,
  setLGA,
  updateAddress,
} from "../store/user-slice";
import Dropdown from "./dropdown";

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

const Address = () => {
  const states = useSelector(selectStates);
  const LGA = useSelector(selectLGA);
  const defaultAddress = useSelector(selectDelivery);

  const [open, setOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLGA, setSelectedLGA] = useState(null);
  const [values, setValues] = useState({
    address: "",
    additional: "",
    state: "",
    city: "",
  });
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (selectedState !== null) {
      dispatch(getState(selectedState));
      dispatch(setLGA());
    }
    if (selectedLGA !== null) {
      dispatch(getLGA(selectedLGA));
    }
  }, [dispatch, selectedState, selectedLGA]);

  const handleSelectState = (state) => {
    setSelectedState(state);
    values.state = state;
  };
  const handleSelectLGA = (state) => {
    setSelectedLGA(state);
    values.city = state;
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const doSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    dispatch(updateAddress(values));
  };

  console.log(values);

  return (
    <div className={address.container__two}>
      <div className={address.address__content}>
        <div className={address.address__title}>
          {open ? (
            <button className={address.address__button} onClick={handleOpen}>
              CANCEL
            </button>
          ) : (
            <button className={address.address__button} onClick={handleOpen}>
              NEW ADDRESS
            </button>
          )}
        </div>
        {open && (
          <div className={address.address__form}>
            {/* <div>You have no registered address</div> */}
            <form className={address.form}>
              <div className={address.address__input__layer}>
                <CssTextField
                  className={address.field}
                  autoFocus
                  label="Address"
                  variant="outlined"
                  required
                  id="custom-css-outlined-input"
                  value={values.address}
                  onChange={handleChange("address")}
                />
                <CssTextField
                  className={address.field}
                  label="Additional Info"
                  variant="outlined"
                  required
                  id="custom-css-outlined-input"
                  value={values.additional}
                  onChange={handleChange("additional")}
                />
              </div>
              <div className={address.address__input__layer}>
                {states && (
                  <Dropdown
                    label="State"
                    drop={states}
                    handle={handleSelectState}
                    styling={address.field}
                  />
                )}
                {LGA && (
                  <Dropdown
                    label="City"
                    drop={LGA}
                    handle={handleSelectLGA}
                    styling={address.field}
                  />
                )}
              </div>
              <button className={address.address__btn} onClick={doSubmit}>
                UPDATE
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
