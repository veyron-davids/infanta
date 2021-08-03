import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import citem from "../css/cartItem.module.css";
import { selectUser } from "../store/auth-slice";
import { selectCartAmount, selectCartCount } from "../store/cart-slice";
import {
  selectAddressTouse,
  selectLoading,
  setAddressToUse,
} from "../store/user-slice";
import Dropdown from "./dropdown";

const shipping = ["---", "Current Address", "New Address"];

const Summary = ({ title, open, handleSubmit }) => {
  const user = useSelector(selectUser);
  const useAdd = useSelector(selectAddressTouse);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const route = useLocation();
  const totalQty = useSelector(selectCartCount);
  const totalAmt = useSelector(selectCartAmount);

  function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const charge = currencyFormat(totalAmt);

  const config = {
    public_key: "",
    tx_ref: Date.now(),
    amount: totalAmt,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd,banktransfer,account,mpesa",
    customer: {
      name: `${user && user.FirstName} ${user && user.LastName}`,
      email: user && user.email,
      phonenumber: user && user.phonenumber,
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
          <div>ITEMS: {totalQty}</div>
          <div>{charge}</div>
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
          <div>{charge}</div>
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
                        onClose: () => {},
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
