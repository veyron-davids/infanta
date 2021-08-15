import React from "react";
import card from "../../mobile/css/products.module.css";
import Buttons from "./button";

const GridCards = () => {
  return (
    <div className={card.container__card}>
      <div className={card.container__card__img}>
        <img
          src="https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=6&m=1057506940&s=612x612&w=0&h=C11yA-ESqeuCX63QkRpPyWmAMXJJvZw0niQluGnATlI="
          alt=""
        />
      </div>
      <div className={card.container__card__details}>
        <div className={card.container__card__name}>
          <span>Best Clothes</span>
          <span>N20,000</span>
        </div>
        <Buttons>
          ADD TO CART
        </Buttons>
      </div>
    </div>
  );
};

export default GridCards;
