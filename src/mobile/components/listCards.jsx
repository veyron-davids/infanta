import React, { memo } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch } from "react-redux";
import list from "../../mobile/css/products.module.css";
import { handleClick, setItemToAdd } from "../../store/cart-slice";
import Buttons from "./button";
const images = [
  "https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=6&m=1057506940&s=612x612&w=0&h=C11yA-ESqeuCX63QkRpPyWmAMXJJvZw0niQluGnATlI=",
  "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://analyticsindiamag.com/wp-content/uploads/2020/10/7d744a684fe03ebc7e8de545f97739dd.jpg",
];

const ListCards = memo(({ product }) => {
  const dispatch = useDispatch();
  function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const price = currencyFormat(product.price);
  return (
    <div className={list.container__list}>
      <div className={list.container__list__img}>
        <Carousel indicators={false}>
          {images.map((item, i) => (
            <img key={i} src={item} alt="" id={list.img__list} />
          ))}
        </Carousel>
      </div>
      <div className={list.container__list__details}>
        <div className={list.container__list__name}>
          <span id={list.spanner}>{product.pname} </span>
          <span>{price}</span>
        </div>
        <Buttons
          onClick={() => {
            dispatch(setItemToAdd(product._id));
            dispatch(handleClick());
          }}
        >
          ADD TO CART
        </Buttons>
      </div>
    </div>
  );
});

export default ListCards;
