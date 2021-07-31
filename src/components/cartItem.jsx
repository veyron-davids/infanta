import React from "react";
import citem from "../css/cartItem.module.css";
import CartProd from "./cartProd";
import Summary from "./summary";

const CartItem = () => {
  return (
    <div className={citem.container}>
      <div className={citem.container__one}>
        <div className={citem.container__title}>
          <li>Product Details</li>
          <li id={citem.push}>Quantity</li>
          <li id={citem.pad}>Price</li>
          <li>Total</li>
        </div>
        <CartProd />
      </div>
      <Summary title="PROCEED" open={true} />
    </div>
  );
};

export default CartItem;
