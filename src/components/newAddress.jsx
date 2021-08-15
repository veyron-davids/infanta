import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { list } from "../assests/states";
import add from "../css/profile.module.css";
import { CreateUserAddress, setNewAddress } from "../store/auth-slice";
import Dropdown from "./dropdown";
import InputField from "./InputField";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Newaddress = ({ handleOpen }) => {
  const [addError, setAddError] = useState();
  const [addTwoError, setAddTwoError] = useState();
  const [values, setValues] = useState({
    addressName: "",
    additional: "",
    state: "Abia",
    city: "",
    default: false
  });
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const states = Object.keys(list);
  const [LGA, setLGA] = useState(list[values.state]);

  // useEffect(() => {
  //   setLGA(list[values.state]);
  // }, [values.state]);

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

  const resetAddError = () => {
    setAddError(null);
  };
  const resetAddTwoError = () => {
    setAddTwoError(null);
  };

  const displayError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const doSubmit = () => {
    try {
      if (
        values.addressName.trim().length === 0 ||
        values.additional.trim().length === 0
      ) {
        setAddError("This field is required");
        setAddTwoError("This field is required");
        return;
      } else {
        dispatch(CreateUserAddress(values)).then((data) => {
          if (data.meta.requestStatus === "fulfilled") {
            dispatch(setNewAddress({ data: values }));
            history.push("/profile/address/display");
          }
        });
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={add.address__form}>
      {/* <div>You have no registered address</div> */}
      {error && (
        <Snackbar open={error} autoHideDuration={2000} onClose={displayError}>
          <Alert onClose={displayError} severity="error">
            Something went wrong
          </Alert>
        </Snackbar>
      )}
      <form className={add.form}>
        <div className={add.address__input__layer}>
          <InputField
            style={add.field}
            autoFocus={true}
            label="Address"
            required={true}
            autocomplete="off"
            value={values.addressName}
            onChange={handleChange("addressName")}
            helperText={addError}
            error={addError != null}
            reset={resetAddError}
          />
          <InputField
            style={add.field}
            label="Additional Info"
            required={true}
            autocomplete="off"
            value={values.additional}
            onChange={handleChange("additional")}
            helperText={addTwoError}
            error={addTwoError != null}
            reset={resetAddTwoError}
          />
        </div>
        <div className={add.address__input__layer}>
          {states && (
            <Dropdown
              label="State"
              drop={states}
              handle={handleSelectState}
              styling={add.field}
            />
          )}
          {LGA && (
            <Dropdown
              label="City"
              drop={LGA}
              handle={handleSelectLGA}
              styling={add.field}
            />
          )}
        </div>
      </form>
      <button
        className={add.address__btn}
        onClick={() => {
          doSubmit();
          // pustRoute();
        }}
      >
        UPDATE
      </button>
    </div>
  );
};

export default Newaddress;
