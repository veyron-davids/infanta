import React from "react";
import card from "../../mobile/css/products.module.css";
import { useDispatch } from "react-redux";
import { setItemToAdd } from "../../store/cart-slice";
import Buttons from "./button";

const GridCards = ({ handleOpenDrawer, product }) => {
    const dispatch = useDispatch();
    function currencyFormat(num) {
      return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    const price = currencyFormat(product.price);
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
          <span>{product.pname}</span>
          <span>{price}</span>
        </div>
        <Buttons
          onClick={() => {
            dispatch(setItemToAdd(product._id));
            handleOpenDrawer();
          }}
        >
          ADD TO CART
        </Buttons>
      </div>
    </div>
  );
};

export default GridCards;
