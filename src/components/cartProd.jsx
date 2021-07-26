
import React from "react";
import citem from "../css/cartItem.module.css";
import Dropdown from "./dropdown";

const qty = [
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  },
];


const CartProd = () => {
  return (
    <div className={citem.container__details}>
      <div className={citem.container__img}>
        <img
          src="https://images.unsplash.com/photo-1497169345602-fbb1a307de16?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"
          alt=""
        />
        <div className={citem.container__name}>
          <div id={citem.span}>Best Product</div>
          <div id={citem.span}>
            Size <span>XL</span>
          </div>
          <div id={citem.span}>Code</div>
        </div>
      </div>
      <div className={citem.custom__select}>
        <Dropdown drop={qty} styling={citem.qty} />
      </div>
      <div className={citem.container__price}>₦20,000</div>
      <div className={citem.container__total}>
        <div id={citem.total}>₦20,000</div>
        <div id={citem.space}>Remove</div>
        <div id={citem.space}>Save for Later</div>
      </div>
    </div>
  );
};

export default CartProd;
