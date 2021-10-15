import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser } from "../../store/auth-slice";
import chk from "../css/cart.module.css";

const CheckOutDelivery = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [defaultAdd, setDefaultAdd] = useState(null);
  const getdefault = () => {
    const add =
      user &&
      user.address.find((item) => {
        return item.default === true;
      });
    setDefaultAdd(add);
  };

  useEffect(() => {
    getdefault();
  }, [user]);

  console.log(defaultAdd);
  return (
    <React.Fragment>
      {defaultAdd ? (
        <div className={chk.check__cont}>
          <div className={chk.check__cont__title}>
            <span>ADDRESS DETAILS</span>
            <span onClick={() => history.push("/profile/address/display")}>
              CHANGE
            </span>
          </div>
          <div className={chk.check__address}>
            <span>
              {user && user.FirstName} {user && user.LastName}
            </span>
            <span>{defaultAdd && defaultAdd.addressName}</span>
            <span>{defaultAdd && defaultAdd.state}</span>
            <span>{defaultAdd && defaultAdd.city}</span>
            <span>{defaultAdd && defaultAdd.phoneNumber}</span>
          </div>
        </div>
      ) : (
        <div className={chk.noadd}>
          <span>You have no registered address</span>
          <br />
          <span
            onClick={() => {
              history.push("/profile/address/display");
            }}
          >
            Add new address
          </span>
        </div>
      )}
    </React.Fragment>
  );
};

export default CheckOutDelivery;
