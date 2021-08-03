import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Carousel from "react-material-ui-carousel";
import prod from "../css/productCont.module.css";
import { useDispatch } from "react-redux";
import { handleClick, setItemToAdd } from "../store/cart-slice";

const Card = ({ product }) => {
  const dispatch = useDispatch();
  function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const price = currencyFormat(product.price);

  return (
    <div className={prod.card}>
      <Carousel>
        {product.images.map((item, i) => (
          <img id={prod.img} key={i} src={item} alt="" />
        ))}
      </Carousel>
      <div className={prod.details}>
        <div className={prod.details__text}>
          <span>{product.pname}</span> <br />
          <span>{price}</span>
        </div>
        <div
          className={prod.details__cart}
          onClick={() => {
            dispatch(setItemToAdd(product._id));
            dispatch(handleClick());
          }}
        >
          <HiOutlineShoppingCart />
        </div>
      </div>
    </div>
  );
};

export default Card;
