import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  handleClick,
  removeAll,
  removeItem,
  setItemToAdd,
} from "../../store/cart-slice";
import wish from "../css/profile.module.css";

const WishListCard = ({ product, handleError }) => {
  const dispatch = useDispatch();
  const productDetails = product.productId;
  const sizes = product.size;
  const prodPrice = productDetails.price ? productDetails.price : 0;
  const prodTotal = product.total ? product.total : 0;
  const ProductTotal = Number(prodTotal) * Number(prodPrice);
  const [error, setError] = useState(false);

  function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const price = productDetails ? currencyFormat(prodPrice) : 0;
  const total = productDetails ? currencyFormat(ProductTotal) : 0;

  const route = useLocation();

  return (
    <div className={wish.wishcard__container}>
      <div className={wish.wishcard__container__leveone}>
        <div className={wish.wishcard__img}>
          <img
            src="https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=6&m=1057506940&s=612x612&w=0&h=C11yA-ESqeuCX63QkRpPyWmAMXJJvZw0niQluGnATlI="
            alt=""
          />
        </div>
        <div className={wish.wishcard__details}>
          <div>
            <span>{productDetails.pname}</span>
            <br />
            <br />
            <span>{price}</span>
            <br />
            <br />
            <div className={wish.size__details}>
              {sizes.small !== 0 && (
                <span id={wish.size}>Small: {sizes.small}</span>
              )}
              {sizes.medium !== 0 && (
                <span id={wish.size}>medium: {sizes.medium}</span>
              )}
              {sizes.large !== 0 && (
                <span id={wish.size}>large: {sizes.large}</span>
              )}
              {sizes.xlarge !== 0 && (
                <span id={wish.size}>xlarge: {sizes.xlarge}</span>
              )}
              {sizes.xxlarge !== 0 && (
                <span id={wish.size}>xxlarge: {sizes.xxlarge}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {route.pathname === "/wishlist" && (
        <div className={wish.wishcard__container__levetwo}>
          <div id={wish.remove}>
            <IoMdTrash />
            <span>REMOVE</span>
          </div>
          <button className={wish.out}>BUY</button>
          {/* <button className={wish.buy}>OUT OF STOCK</button> */}
        </div>
      )}
      {route.pathname === "/cart/summary" && (
        <div className={wish.wishcard__container__levetwo}>
          <div className={wish.hearted}>
            <div id={wish.heart}>
              <AiOutlineHeart />
            </div>
            <div
              id={wish.remove}
              onClick={() => {
                try {
                  dispatch(removeItem({ productID: productDetails._id })).then(
                    (data) => {
                      if (data.meta.requestStatus === "fulfilled") {
                        dispatch(removeAll({ id: productDetails._id }));
                      } else if (data.meta.requestStatus === "rejected") {
                        handleError();
                      }
                    }
                  );
                } catch (error) {
                  handleError();
                }
              }}
            >
              <IoMdTrash />
              <span>REMOVE</span>
            </div>
          </div>
          <button
            className={wish.out}
            onClick={() => {
              dispatch(setItemToAdd(productDetails._id));
              dispatch(handleClick());
            }}
          >
            EDIT
          </button>
          {/* <button className={wish.buy}>OUT OF STOCK</button> */}
        </div>
      )}
    </div>
  );
};

export default WishListCard;
