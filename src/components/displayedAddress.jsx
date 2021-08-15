import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import add from "../css/profile.module.css";
import { selectUser, fetchUser } from "../store/auth-slice";
import AddressBox from "./addressBox";

const DisplayedAddress = ({ address }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(fetchUser());
  }, [])

  return (
    <div className={add.address__box__content}>
      {user &&
        user.address.map((item) => (
          <AddressBox key={item._id} UserAddress={item} />
        ))}
    </div>
  );
};

export default DisplayedAddress;
