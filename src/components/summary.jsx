import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import citem from "../css/cartItem.module.css";
import {
  selectAddressTouse,
  setAddressToUse,
  selectLoading,
} from "../store/user-slice";
import Dropdown from "./dropdown";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import Spin from "./spin.jsx";

const shipping = ["---", "Current Address", "New Address"];

const Summary = ({ title, open, handleSubmit }) => {
  const useAdd = useSelector(selectAddressTouse);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const route = useLocation();
  console.log(route);

  const config = {
    public_key: "FLWPUBK-0495d651437d10dea892e04e98e09dcd-X",
    tx_ref: Date.now(),
    amount: 1,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd,banktransfer,account,mpesa",
    customer: {
      name: "joel ugwumadu",
      email: "user@gmail.com",
      phonenumber: "07064586146",
    },
    // redirect_url: "",
    customizations: {
      title: "Infanta Global Wears",
      description: "Payment for items in cart",
      logo: "https://shopper-io-bucket.s3.us-east-2.amazonaws.com/In..svg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleChange = (e) => {
    dispatch(setAddressToUse(e));
  };

  return (
    <div className={citem.container__two}>
      <span>ORDER SUMMARY</span>
      <div className={citem.first}>
        <div className={citem.first__one}>
          <div>ITEMS 2</div>
          <div>N20, 000</div>
        </div>
        <div className={citem.first__two}>SHIPPING</div>
        <div className={citem.first__three}>
          <Dropdown
            label="Preferred Address"
            drop={shipping}
            styling={citem.shipping}
            handle={handleChange}
            // disabled={open}
          />
        </div>
      </div>
      <div className={citem.second}>
        <div className={citem.first__one}>
          <div>TOTAL COST</div>
          <div>N20, 000</div>
        </div>
        <div className={citem.first__three}>
          <NavLink to="/cart/delivery-details">
            {useAdd ? (
              <button
                className={citem.button}
                onClick={() =>
                  route.pathname === "/cart/delivery-details"
                    ? handleFlutterPayment({
                        callback: (response) => {
                          console.log(response);
                          closePaymentModal(); // this will close the modal programmatically
                        },
                      onClose: () => {
                        },
                      })
                    : ""
                }
              >
                {title}
              </button>
            ) : (
              <button className={citem.button} onClick={handleSubmit}>
                {loading ? <div className={citem.ring}></div> : "UPDATE"}
              </button>
            )}
          </NavLink>
        </div>
        <div className={citem.second__two}>
          <input type="text" placeholder="Enter Coupon" id={citem.input} />
          <button className={citem.button__two}>APPLY</button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Summary);
