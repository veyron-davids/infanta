import React from 'react'
import open from "../css/profile.module.css";
import OrderCard from './orderCard';
import { selectOpenOrders } from "../store/order-slice";

const OpenOrders = () => {
    return (
      <div div className={open.container__two}>
      <div div className={open.content}>
        <OrderCard />
      </div>
      </div>
    );
}

export default OpenOrders
