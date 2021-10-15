import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CartItem from "../components/cartItem";
import Delivery from "../components/delivery";
import Payment from "../components/payment";
import cart from "../css/cartPage.module.css";
import CartPage from "../mobile/pages/CartPage";
import Checkout from "../mobile/pages/Checkout";
import ProtectedRoute from "../services/protectedRoute";

const Cart = () => {
  const [cTab, setCtab] = useState(false);
  const [dTab, setDtab] = useState(false);
  const [pTab, setPtab] = useState(false);
  const [sTab, setStab] = useState(false);
  const route = useLocation();

  useEffect(() => {
    if (route.pathname === "/cart/summary") {
      setCtab(true);
    } else {
      setCtab(false);
    }
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
  }, []);

  return (
    <React.Fragment>
      <div className={cart.container}>
        <div className={cart.container__one}>
          <div
            className={dTab || pTab || sTab ? cart.completed : cart.item}
            id={cTab && cart.act}
          >
            Cart
          </div>
          <div
            className={pTab || sTab ? cart.completed : cart.item}
            id={dTab && cart.act}
          >
            Delivery
          </div>
          <div
            className={sTab ? cart.completed : cart.item}
            id={pTab && cart.act}
          >
            Payment
          </div>
          <div className={cart.item} id={sTab && cart.act}>
            Status
          </div>
        </div>
        <ProtectedRoute path="/cart/summary" component={CartItem} />
        <ProtectedRoute path="/cart/delivery-details" component={Delivery} />
        <ProtectedRoute path="/cart/payment" component={Payment} />
      </div>
      <ProtectedRoute path="/cart/summary" component={CartPage} />
      <ProtectedRoute path="/cart/delivery-details" component={Checkout} />
      <ProtectedRoute path="/cart/payment" component={Checkout} />
      <ProtectedRoute path="/cart/status" component={Checkout} />
    </React.Fragment>
  );
};

export default Cart;
