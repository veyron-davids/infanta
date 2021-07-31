import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import deliver from "../css/delivery.module.css";
import auth from "../services/authService";
import {
  getLGA,
  getState,
  selectAddressTouse,
  selectLGA,
  selectStates,
  setLGA,
  updateAddress
} from "../store/user-slice";
import Dropdown from "./dropdown";
import Summary from "./summary";

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

const Delivery = () => {
  const [user, setUser] = useState();
  const states = useSelector(selectStates);
  const useAdd = useSelector(selectAddressTouse);
  const LGA = useSelector(selectLGA);
  const [open, setOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLGA, setSelectedLGA] = useState(null);
  const [values, setValues] = useState({
    FirstName: auth.getCurrentUser()["FirstName"],
    LastName: auth.getCurrentUser()["LastName"],
    email: auth.getCurrentUser()["email"],
    phoneNumber: auth.getCurrentUser()["phoneNumber"],
    address: auth.getCurrentUser()["delivery"]["address"],
    additional: auth.getCurrentUser()["delivery"]["additional"],
    state: auth.getCurrentUser()["delivery"]["state"],
    city: auth.getCurrentUser()["delivery"]["city"],
  });
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(!open);
  };

  const getUser = async () => {
    const data = await auth.getCurrentUser();
    setUser(data);
  };
  console.log(user);

  useEffect(() => {
    getUser();
    if (selectedState !== null) {
      dispatch(getState(selectedState));
      dispatch(setLGA());
    }
    if (selectedLGA !== null) {
      dispatch(getLGA(selectedLGA));
    }
  }, [dispatch, selectedState, selectedLGA, useAdd]);

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

  return (
    <div className={deliver.container}>
      <div className={deliver.container__one}>
        <span>Shipping Information</span>
        <form>
          <div className={deliver.container__form}>
            <CssTextField
              className={deliver.field}
              autoFocus
              // disabled={useAdd}
              disabled={true}
              label="First Name"
              variant="outlined"
              required
              id="custom-css-outlined-input"
              value={values.FirstName}
              onChange={handleChange("FirstName")}
            />
            <CssTextField
              className={deliver.field}
              // disabled={useAdd}
              disabled={true}
              label="Last Name"
              variant="outlined"
              required
              id="custom-css-outlined-input"
              value={values.LastName}
              onChange={handleChange("LastName")}
            />
          </div>
          <div className={deliver.container__form}>
            <CssTextField
              className={deliver.field}
              disabled={useAdd}
              label="Phone Number"
              variant="outlined"
              required
              id="custom-css-outlined-input"
              value={values.phoneNumber}
              onChange={handleChange("phoneNumber")}
            />
            <CssTextField
              className={deliver.field}
              label="Email"
              disabled={useAdd}
              variant="outlined"
              required
              id="custom-css-outlined-input"
              value={values.email}
              onChange={handleChange("email")}
            />
          </div>
          <div className={deliver.container__form}>
            <CssTextField
              className={deliver.field}
              disabled={useAdd}
              label="Address"
              variant="outlined"
              required
              id="custom-css-outlined-input"
              value={values.address}
              onChange={handleChange("address")}
            />
            <CssTextField
              className={deliver.field}
              label="Additional Info"
              disabled={useAdd}
              variant="outlined"
              required
              id="custom-css-outlined-input"
              value={values.additional}
              onChange={handleChange("additional")}
            />
          </div>
          {!useAdd ? (
            <div className={deliver.container__form}>
              {states && (
                <Dropdown
                  label="State"
                  drop={states}
                  handle={handleSelectState}
                  styling={deliver.field}
                />
              )}
              {LGA && (
                <Dropdown
                  label="City"
                  drop={LGA}
                  handle={handleSelectLGA}
                  styling={deliver.field}
                />
              )}
            </div>
          ) : (
            <div className={deliver.container__form}>
              <CssTextField
                className={deliver.field}
                disabled={useAdd}
                label="State"
                variant="outlined"
                required
                id="custom-css-outlined-input"
                value={values.state}
              />
              <CssTextField
                className={deliver.field}
                label="City"
                disabled={useAdd}
                variant="outlined"
                required
                id="custom-css-outlined-input"
                value={values.city}
              />
            </div>
          )}
        </form>
      </div>
      <Summary title="CHECKOUT" open={false} handleSubmit={doSubmit} />
    </div>
  );
};

export default Delivery;
