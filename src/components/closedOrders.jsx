import React from "react";
import closed from "../css/profile.module.css";
import { selectClosedOrders } from "../store/order-slice";

const ClosedOrders = () => {
  return (
    <div className={closed.container__two}>
      <div className={closed.content}>
        <div id={closed.empty}>You have no closed Orders</div>
      </div>
    </div>
  );
};

export default ClosedOrders;
