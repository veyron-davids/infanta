import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useFlutterwave } from "flutterwave-react-v3";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import citem from "../css/cartItem.module.css";
import {
  selectAddressTouse,
  selectLoading,
  selectUser,
  setAddressToUse,
} from "../store/auth-slice";
import {
  selectCart,
  selectCartAmount,
  selectCartCount,
} from "../store/cart-slice";
import { AddOrders } from "../store/order-slice";
import Dropdown from "./dropdown";

const shipping = ["Current Address", "New Address"];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Summary = ({ title, open, handleSubmit }) => {
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const useAdd = useSelector(selectAddressTouse);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const route = useLocation();
  const totalQty = useSelector(selectCartCount);
  const totalAmt = useSelector(selectCartAmount);
  const [data, setData] = useState({
    products: [],
    total: totalAmt,
  });
  const [error, setError] = useState(false);
  const history = useHistory();
  function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const getOrders = () => {
    cart.length > 0 &&
      cart.map((item) => {
        data.products.push({ productId: item.productId._id, size: item.size });
      });
  };

  console.log(data);

  useEffect(() => {
    getOrders();
  }, []);

  const displayError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const charge = currencyFormat(totalAmt);

  const config = {
    public_key: "FLWPUBK-0495d651437d10dea892e04e98e09dcd-X",
    tx_ref: Date.now(),
    amount: totalAmt,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd,banktransfer,account,mpesa",
    customer: {
      name: `${user && user.FirstName} ${user && user.LastName}`,
      email: user && user.email,
      phonenumber: user && user.phonenumber,
    },
    redirect_url: "http://localhost:3000/cart/payment",
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
      {error && (
        <Snackbar open={error} autoHideDuration={2000} onClose={displayError}>
          <Alert onClose={displayError} severity="error">
            Your cart is empty!
          </Alert>
        </Snackbar>
      )}
      <span>ORDER SUMMARY</span>
      <div className={citem.first}>
        <div className={citem.first__one}>
          <div>TOTAL COST ({totalQty})</div>
          <div>{charge}</div>
        </div>
        <div className={citem.first__two}>SHIPPING</div>
        <div className={citem.first__three}>
          <Dropdown
            label="Preferred Address"
            drop={shipping}
            styling={citem.shipping}
            value={useAdd ? "Current Address" : "New Address"}
            handle={handleChange}
            // disabled={open}
          />
        </div>
      </div>
      <div className={citem.second}>
        <div className={citem.first__three}>
          {route.pathname === "/cart/delivery-details" && useAdd && (
            <button
              className={citem.button}
              onClick={() => {
                dispatch(AddOrders(data));
                //  handleFlutterPayment({
                //     callback: (response) => {
                //       if (response.status === "successful") {
                //         console.log(response);
                //           dispatch(AddOrders(data)).then((data) => {
                //             if (data.meta.requestStatus === "fulfilled") {
                //   dispatch(emptyCart({id: productDetails._id}));
                // } else if (data.meta.requestStatus === "rejected") {
                //   setError(true);
                // }
                // })
                //       } else {
                //       }
                //       closePaymentModal(); // this will close the modal programmatically
                //     },
                //     onClose: () => {

                //     },
                //   })
              }}
            >
              {" "}
              {title}
            </button>
          )}
          {route.pathname === "/cart/summary" && (
            <button
              className={citem.button}
              onClick={() => {
                cart.length < 1
                  ? setError(true)
                  : history.push("/cart/delivery-details");
              }}
            >
              {title}
            </button>
          )}
          {!useAdd && route.pathname === "/cart/delivery-details" && (
            <button className={citem.button} onClick={handleSubmit}>
              {loading ? <div className={citem.ring}></div> : "UPDATE"}
            </button>
          )}
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
