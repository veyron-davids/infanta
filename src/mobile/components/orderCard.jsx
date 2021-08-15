import React from "react";
import card from "../css/profile.module.css";

const OrderCard = () => {
  return (
    <div className={card.Ordercard__container}>
      <div className={card.orderCard__img}>
        <img
          src="https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=6&m=1057506940&s=612x612&w=0&h=C11yA-ESqeuCX63QkRpPyWmAMXJJvZw0niQluGnATlI="
          alt=""
        />
      </div>
      <div className={card.orderCard__details}>
        <div>
          <span>PS3 Slim Console 320GB Plus 2 ...</span>
          <br />
          <span>Order 395478299</span>
        </div>
        <div>
          <div id={card.status}>
            <span>DELIVERED</span>
          </div>
          <span>On 25-03-2019</span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default OrderCard;
