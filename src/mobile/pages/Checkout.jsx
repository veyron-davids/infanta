import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { usePaystackPayment } from "react-paystack";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ProtectedRoute from "../../services/protectedRoute";
import { selectUser } from "../../store/auth-slice";
import { selectCartAmount } from "../../store/cart-slice";
import Buttons from "../components/button";
import CheckOutDelivery from "../components/checkOutDelivery";
import Footer from "../components/footer";
import SnackError from "../components/snackError";
import chk from "../css/cart.module.css";

const Checkout = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const route = useLocation();
  const [dTab, setDtab] = useState(false);
  const [pTab, setPtab] = useState(false);
  const [sTab, setStab] = useState(false);
  const [error, setError] = useState(false);
  const totalAmt = useSelector(selectCartAmount);

  console.log(totalAmt);

  function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const charge = currencyFormat(totalAmt);

  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: totalAmt,
    publicKey: "pk_test_cd2e3fab775fb1a46cb0f23bc0935d599aba6a7b",
  };

  const initializePayment = usePaystackPayment(config);

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  useEffect(() => {
    if (route.pathname === "/cart/delivery-details") {
      setDtab(true);
    } else {
      setDtab(false);
    }
    if (route.pathname === "/cart/payment") {
      setPtab(true);
    } else {
      setPtab(false);
    }
    if (route.pathname === "/cart/sum") {
      setStab(true);
    } else {
      setStab(false);
    }
    if (error === true) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <React.Fragment>
      {error && <SnackError msg="You have no registered address" />}
      <div className={chk.checkout__container}>
        <div>
          <div className={chk.checkout__title}>
            <div className={chk.checkout__one}>
              <div onClick={() => history.push("/")}>
                <MdClose id={chk.burger} />
              </div>
              <span>Checkout</span>
            </div>
            <div className={chk.checkout__two}>
              <span
                className={dTab ? chk.act : ""}
                id={pTab || sTab ? chk.completed : ""}
              >
                DELIVERY
              </span>
              <span
                className={pTab ? chk.act : ""}
                id={sTab ? chk.completed : ""}
              >
                PAYMENT
              </span>
              <span className={sTab ? chk.act : ""}>STATUS</span>
            </div>
          </div>
          <ProtectedRoute
            path="/cart/delivery-details"
            component={CheckOutDelivery}
          />
        </div>
        <div className={chk.summ}>
          <div className={chk.summ__one}>
            <div className={chk.stretch}>
              <span>Subtotal</span>
              <span>{charge}</span>
            </div>
            <br />
            <div className={chk.stretch}>
              <span>Shipping Fee</span>
              <span>{}</span>
            </div>
          </div>
          <hr />
          <div className={chk.summ__two}>
            <div className={chk.stretch}>
              <span>Total</span>
              <span>{charge}</span>
            </div>

            <Buttons
              id={chk.space__two}
              style={chk.but}
              onClick={() => {
                if (route.pathname === "/cart/delivery-details") {
                  if (user && user["address"].length === 0) {
                    setError(true);
                    return;
                  } else {
                    history.push("/cart/payment");
                  }
                }
                if (route.pathname === "/cart/payment") {
                  initializePayment(onSuccess, onClose);
                }
              }}
            >
              {route.pathname === "/cart/delivery-details" &&
                "PROCEED TO PAYMENT"}
              {route.pathname === "/cart/payment" && "PAY NOW"}
              {/* {route.pathname === "/cart/delivery-details" &&
                "PROCEED TO PAYMENT"} */}
            </Buttons>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Checkout;
