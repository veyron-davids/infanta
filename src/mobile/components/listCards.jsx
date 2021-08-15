import React from "react";
import list from "../../mobile/css/products.module.css";
import Buttons from "./button";

const ListCards = () => {
  return (
    <div className={list.container__list}>
      <div className={list.container__list__img}>
        <img
          src="https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=6&m=1057506940&s=612x612&w=0&h=C11yA-ESqeuCX63QkRpPyWmAMXJJvZw0niQluGnATlI="
          alt=""
        />
      </div>
      <div className={list.container__list__details}>
        <div className={list.container__list__name}>
          <span id={list.spanner}>Best clothes Best clothes Best clothes </span>
          <span>N20,000</span>
        </div>
        <Buttons>ADD TO CART</Buttons>
      </div>
    </div>
  );
};

export default ListCards;
