import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { list } from "../assests/states";
import deliver from "../css/delivery.module.css";
import { selectAddressTouse, selectUser } from "../store/auth-slice";
import { fetchCart } from "../store/cart-slice";
import Dropdown from "./dropdown";
import Summary from "./summary";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Delivery = () => {
  const user = useSelector(selectUser);
  const useAdd = useSelector(selectAddressTouse);
  const [defaultAdd, setDefaultAdd] = useState(null);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    FirstName: user && user.FirstName,
    LastName: user && user.LastName,
    email: user && user.email,
    phoneNumber: user && user.phoneNumber,
    addressName: "",
    additional: "",
    state: "Abia",
    city: "",
  });
  const states = Object.keys(list);
  const [LGA, setLGA] = useState(list[values.state]);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(!open);
  };

  const displayError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const getDefaultAdd = () => {
    if (user && user.address.length === 1) {
      setDefaultAdd(user.address[0]);
    } else if (user && user.address.length > 1) {
      user &&
        user.address.map((item) => {
          if (item.default === true) {
            setDefaultAdd(item);
          }
        });
    } else if (user && user.address.length === 0 && useAdd === true) {
      setError(true);
    }
  };

  console.log(defaultAdd);
  console.log(user);

  useEffect(() => {
    getDefaultAdd();
    dispatch(fetchCart());
  }, [dispatch, useAdd]);

  const handleSelectState = (state) => {
    values.state = state;
    setLGA(list[state]);
  };
  const handleSelectLGA = (state) => {
    values.city = state;
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const doSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    //  dispatch(updateAddress(values));
  };

  return (
    <div className={deliver.container}>
      {error && (
        <Snackbar open={error} autoHideDuration={3000} onClose={displayError}>
          <Alert onClose={displayError} severity="error">
            Please add an address to your account
          </Alert>
        </Snackbar>
      )}
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
              disabled={true}
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
              disabled={true}
              variant="outlined"
              required
              id="custom-css-outlined-input"
              value={values.email}
              onChange={handleChange("email")}
            />
          </div>
          {!useAdd ? (
            <div className={deliver.container__form}>
              <CssTextField
                className={deliver.field}
                label="Address"
                variant="outlined"
                required
                id="custom-css-outlined-input"
                value={values.addressName}
                onChange={handleChange("address")}
              />
              <CssTextField
                className={deliver.field}
                label="Additional Info"
                variant="outlined"
                required
                id="custom-css-outlined-input"
                value={values.additional}
                onChange={handleChange("additional")}
              />
            </div>
          ) : (
            <div className={deliver.container__form}>
              <CssTextField
                className={deliver.field}
                disabled={true}
                label="Address"
                variant="outlined"
                required
                id="custom-css-outlined-input"
                value={defaultAdd && defaultAdd.addressName}
              />
              <CssTextField
                className={deliver.field}
                label="Additional Info"
                disabled={true}
                variant="outlined"
                required
                id="custom-css-outlined-input"
                value={defaultAdd && defaultAdd.additional}
              />
            </div>
          )}
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
                value={defaultAdd && defaultAdd.state}
              />
              <CssTextField
                className={deliver.field}
                label="City"
                disabled={useAdd}
                variant="outlined"
                required
                id="custom-css-outlined-input"
                value={defaultAdd && defaultAdd.city}
              />
            </div>
          )}
        </form>
      </div>
      <Summary title="PROCEED" open={false} handleSubmit={doSubmit} />
    </div>
  );
};

export default Delivery;
