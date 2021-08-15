import React from "react";
import { NavLink } from "react-router-dom";
import orderCard from "../css/profile.module.css";

const OrderCard = () => {
  return (
    <div className={orderCard.orderCard__container}>
      <div className={orderCard.div__one}>
        <img
          src="https://im0-tub-ru.yandex.net/i?id=84dbd50839c3d640ebfc0de20994c30d&n=27&h=480&w=480"
          alt=""
        />
      </div>
      <div className={orderCard.div__two}>
        <div>
          <span>
            PS3 Slim Console 320GB Plus 2 Controllers & 21 Latest Games
            Including FIFA
          </span>{" "}
          <br />
          <span id={orderCard.orderId}>Order 395478299</span>
        </div>
        <div className={orderCard.delivery}>
          {/* <span id={orderCard.delivered}>DELIVERED</span> <br/> */}
          {/* <span id={orderCard.pending}>PENDING</span> <br/> */}
          <span id={orderCard.processing}>PROCESSING</span> <br />
          <span>On 25-03-2019</span>
        </div>
      </div>
      <div>
        <NavLink
          to="/profile/orders/details/1"
          className={orderCard.div__three}
          style={{ textDecoration: "none" }}
        >
          <span>Details</span>
        </NavLink>
      </div>
    </div>
  );
};

export default OrderCard;
