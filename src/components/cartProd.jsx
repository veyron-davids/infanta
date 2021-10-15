import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import Carousel from "react-material-ui-carousel";
import { useDispatch } from "react-redux";
import citem from "../css/cartItem.module.css";
import {
  handleClick,
  removeAll,
  removeItem,
  setItemToAdd,
} from "../store/cart-slice";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const images = [
  "https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=6&m=1057506940&s=612x612&w=0&h=C11yA-ESqeuCX63QkRpPyWmAMXJJvZw0niQluGnATlI=",
  "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://analyticsindiamag.com/wp-content/uploads/2020/10/7d744a684fe03ebc7e8de545f97739dd.jpg",
];

const CartProd = ({ product }) => {
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

  const displayError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const price = productDetails ? currencyFormat(prodPrice) : 0;
  const total = productDetails ? currencyFormat(ProductTotal) : 0;

  return (
    <div className={citem.container__details}>
      {error && (
        <Snackbar open={error} autoHideDuration={3000} onClose={displayError}>
          <Alert onClose={displayError} severity="error">
            Something went wrong!
          </Alert>
        </Snackbar>
      )}
      <div className={citem.container__img}>
        {/* <img
            src="https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=6&m=1057506940&s=612x612&w=0&h=C11yA-ESqeuCX63QkRpPyWmAMXJJvZw0niQluGnATlI="
            alt=""
          /> */}
        <Carousel indicators={false}>
          {images.map((item, i) => (
            <img key={i} src={item} alt="" id={citem.container__img__holder} />
          ))}
        </Carousel>
      <div className={citem.container__name}>
        <div>{productDetails.pname}</div>
      </div>
      </div>
      <div className={citem.custom__select}>
        {sizes.small !== 0 && <span>Small: {sizes.small}</span>}
        {sizes.medium !== 0 && <span>medium: {sizes.medium}</span>}
        {sizes.large !== 0 && <span>large: {sizes.large}</span>}
        {sizes.xlarge !== 0 && <span>xlarge: {sizes.xlarge}</span>}
        {sizes.xxlarge !== 0 && <span>xxlarge: {sizes.xxlarge}</span>}
      </div>
      <div className={citem.container__price}>{price}</div>
      <div className={citem.container__total}>
        <div id={citem.total}>{total}</div>
      </div>
      <div className={citem.settings}>
        <MdEdit
          id={citem.settings__icon}
          onClick={() => {
            dispatch(setItemToAdd(productDetails._id));
            dispatch(handleClick());
          }}
        />
        <MdDelete
          id={citem.settings__icon}
          onClick={() => {
            try {
              dispatch(removeItem({ productID: productDetails._id })).then(
                (data) => {
                  if (data.meta.requestStatus === "fulfilled") {
                    dispatch(removeAll({ id: productDetails._id }));
                  } else if (data.meta.requestStatus === "rejected") {
                    setError(true);
                  }
                }
              );
            } catch (error) {
              setError(true);
            }
          }}
        />
        <BsHeartFill id={citem.settings__icon} />
      </div>
    </div>
  );
};

export default CartProd;
