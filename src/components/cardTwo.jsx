import React from "react";
import crd from "../css/cardTwo.module.css";

const CardTwo = ({ product }) => {
  function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const price = currencyFormat(product.price);
  return (
    <div className={crd.card}>
      <img
        id={crd.img}
        src="https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=6&m=1057506940&s=612x612&w=0&h=C11yA-ESqeuCX63QkRpPyWmAMXJJvZw0niQluGnATlI="
        alt=""
      />
      <div className={crd.details}>
        <div className={crd.details__text}>
          <span>{product.pname}</span> <br />
          <span>{price}</span>
        </div>
        {/* <div
          className={crd.details__cart}
          //   onClick={() => {
          //     dispatch(setItemToAdd(product._id));
          //     dispatch(handleClick());
          //   }}
        >
          <HiOutlineShoppingCart />
        </div> */}
      </div>
    </div>
  );
};

export default CardTwo;
