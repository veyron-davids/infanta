import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Carousel from "react-material-ui-carousel";
import { useDispatch } from "react-redux";
import prod from "../css/productCont.module.css";
import { handleClick } from "../store/product-slice";

const Card = ({ product }) => {
  const dispatch = useDispatch();

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
          <span>{product.price}</span>
        </div>
        <div
          className={prod.details__cart}
          onClick={() => dispatch(handleClick())}
        >
          <HiOutlineShoppingCart />
        </div>
      </div>
    </div>
  );
};

export default Card;
