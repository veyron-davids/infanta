import React, { useState } from "react";
import { useSelector } from "react-redux";
import DropdownMobile from "../../mobile/components/dropDown";
import { selectUser } from "../../store/auth-slice";
import detail from "../css/profile.module.css";
import VariantInput from "./variantInput";
import { ReactComponent as Spinner } from "../../assests/spinner.svg";
import Buttons from "./button";

const gender = ["---", "Male", "Female"];

const DetailsForm = () => {
  const user = useSelector(selectUser);
  const [emError, setEmerror] = useState();
    const [phError, setPherror] = useState();
      const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    FirstName: user && user.FirstName,
    LastName: user && user.LastName,
    email: "",
    phoneNumber: null,
    gender: "",
    dob: "",
  });

  const handleChange = (prop) => (state) => {
    setValues({ ...values, [prop]: state });
  };

  const handleGender = (state) => {
    values.gender = state;
  };

  const resetMailError = () => {
    setEmerror(null);
  };
  const resetPhError = () => {
    setPherror(null);
  };

  const doSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
    setEmerror(null);
    setPherror(null);
    try {
      if (
        values.email.trim().length === 0 ||
        values.phoneNumber.trim().length === 0
      ) {
        setEmerror("This field is required");
        setPherror("This field is required");
        return;
      } else if (values.phoneNumber.trim() !== Number) {
          setPherror("Enter a valid phone number");
      } else {
        
          console.log(values);
          setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={detail.detail__container__form}>
      <VariantInput
        disabled
        label="First Name"
        value={values.FirstName}
        handleChange={handleChange("FirstName")}
      />
      <VariantInput
        disabled
        label="Last Name"
        value={values.LastName}
        handleChange={handleChange("LastName")}
      />
      <VariantInput
        onBlur={resetMailError}
        label="Email"
        handleChange={handleChange("email")}
        helperText={emError}
        error={emError != null}
      />
      <VariantInput
        onBlur={resetPhError}
        label="Phone Number"
        max={{ maxLength: 11 }}
        handleChange={handleChange("phoneNumber")}
      />
      <DropdownMobile drop={gender} label="Gender" handle={handleGender} />
      <VariantInput
        label="Bithday"
        autoFocus
        type="date"
        handleChange={handleChange("dob")}
      />
      <Buttons style={detail.buttons} onClick={doSubmit} disabled={loading}>
        {loading ? <Spinner /> : "SUBMIT"}
      </Buttons>
    </form>
  );
};

export default DetailsForm;
