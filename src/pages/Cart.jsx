import React from "react";
import { NavLink, Route } from "react-router-dom";
import CartItem from "../components/cartItem";
import Delivery from "../components/delivery";
import Payment from "../components/payment";
import cart from "../css/cartPage.module.css";
import ProtectedRoute from "../services/protectedRoute";

const Cart = () => {
  return (
    <div className={cart.container}>
      <div className={cart.container__one}>
        <NavLink
          to="/cart/summary"
          className={cart.item__one}
          activeClassName={cart.active}
          style={{ textDecoration: "none" }}
        >
          <div>Cart Items</div>
        </NavLink>
        <NavLink
          to="/cart/delivery-details"
          className={cart.item__two}
          activeClassName={cart.active}
          style={{ textDecoration: "none" }}
        >
          <div>Delivery Details</div>
        </NavLink>
        <NavLink
          to="/cart/payment"
          className={cart.item__three}
          activeClassName={cart.active}
          style={{ textDecoration: "none" }}
        >
          <div>Payment</div>
        </NavLink>
      </div>
      <ProtectedRoute path="/cart/summary" component={CartItem} />
      <ProtectedRoute path="/cart/delivery-details" component={Delivery} />
      <ProtectedRoute path="/cart/payment" component={Payment} />
    </div>
  );
};

export default Cart;
