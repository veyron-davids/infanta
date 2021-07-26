import React from 'react'
import citem from "../css/cartItem.module.css";
import Dropdown from "./dropdown";
import { NavLink, Route } from "react-router-dom";

const shipping = [
  {
    value: "Current Address",
  },
  {
    value: "New Address",
  },
];

const Summary = ({title}) => {
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
            <Dropdown drop={shipping} styling={citem.shipping} />
          </div>
        </div>
        <div className={citem.second}>
          <div className={citem.first__one}>
            <div>TOTAL COST</div>
            <div>N20, 000</div>
          </div>
          <div className={citem.first__three}>
            <NavLink to="/cart/delivery-details">
              <button className={citem.button}>{title}</button>
            </NavLink>
          </div>
          <div className={citem.second__two}>
            <input type="text" placeholder="Enter Coupon" id={citem.input} />
            <button className={citem.button__two}>APPLY</button>
          </div>
        </div>
      </div>
    );
}

export default Summary
