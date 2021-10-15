import React, { memo } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Carousel from "react-material-ui-carousel";
import { useDispatch } from "react-redux";
import prod from "../css/productCont.module.css";
import { handleClick, setItemToAdd } from "../store/cart-slice";

const images = [
  "https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=6&m=1057506940&s=612x612&w=0&h=C11yA-ESqeuCX63QkRpPyWmAMXJJvZw0niQluGnATlI=",
  "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://analyticsindiamag.com/wp-content/uploads/2020/10/7d744a684fe03ebc7e8de545f97739dd.jpg",
];

const Card = memo(({ product }) => {
  const dispatch = useDispatch();
  function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const price = currencyFormat(product.price);

  return (
    <div className={prod.card}>
      {/* <img
          id={prod.img}
          src="https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=6&m=1057506940&s=612x612&w=0&h=C11yA-ESqeuCX63QkRpPyWmAMXJJvZw0niQluGnATlI="
          alt=""
        /> */}
      {/* {product.images.map((item, i) => ( */}
      {/* <img id={prod.img} key={i} src={item} alt="" /> */}
      {/* // ))} */}
      <Carousel indicators={false}>
        {images.map((item, i) => (
          <img key={i} src={item} alt="" id={prod.img} />
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
});

export default Card;
