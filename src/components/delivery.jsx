import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import deliver from "../css/delivery.module.css";
import {
  getLGA,
  getState,
  selectLGA,
  selectStates,
  setLGA,
} from "../store/cart-slice";
import CustomInput from "./customInput";
import DropTwo from "./dropTwo";
import Summary from "./summary";

const Delivery = () => {
  const LGA = useSelector(selectLGA);
  const states = useSelector(selectStates);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLGA, setSelectedLGA] = useState(null);

  const dispatch = useDispatch();

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
  };
  const handleSelectLGA = (state) => {
    setSelectedLGA(state);
  };

  console.log(selectedLGA);

  return (
    <div className={deliver.container}>
      <div className={deliver.container__one}>
        <span>Shipping Information</span>
        <form>
          <div className={deliver.container__form}>
            <CustomInput label="First Name" />
            <CustomInput label="Last Name" />
          </div>
          <div className={deliver.container__form}>
            <CustomInput label="Phone Number" />
            <CustomInput label="Address" />
          </div>
          <div className={deliver.container__form}>
            {/* {country.length > 0 && (
              <DropTwo label="Country" data={country} handleChange={handle} />
            )} */}
            {states && (
              <DropTwo
                label="State"
                data={states}
                handleChange={handleSelectState}
              />
            )}
            {LGA && (
              <DropTwo label="City" data={LGA} handleChange={handleSelectLGA} />
            )}
          </div>
        </form>
      </div>
      <Summary title="CHECKOUT" />
    </div>
  );
};

export default Delivery;
