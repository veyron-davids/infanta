import React, { useState } from "react";
import { useDispatch } from "react-redux";
import citem from "../css/cartItem.module.css";
import {
  handleClick,
  removeAll,
  removeItem,
  setItemToAdd,
} from "../store/cart-slice";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
        <img
          src="https://images.unsplash.com/photo-1497169345602-fbb1a307de16?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"
          alt=""
        />
        <div className={citem.container__name}>
          <div id={citem.span}>{productDetails.pname}</div>
        </div>
      </div>
      <div className={citem.custom__select}>
        {sizes.small !== 0 && <span>Small: {sizes.small}</span>}
        {sizes.medium !== 0 && <span>medium: {sizes.medium}</span>}
        {sizes.large !== 0 && <span>large: {sizes.large}</span>}
        {sizes.xlarge !== 0 && <span>xlarge: {sizes.xlarge}</span>}
        {sizes.xxlarge !== 0 && <span>xxlarge: {sizes.xxlarge}</span>}
        {/* <Dropdown drop={qty} styling={citem.qty} /> */}
      </div>
      <div className={citem.container__price}>{price}</div>
      <div className={citem.container__total}>
        <div id={citem.total}>{total}</div>
        <div
          id={citem.space}
          onClick={() => {
            dispatch(setItemToAdd(productDetails._id));
            dispatch(handleClick());
          }}
        >
          Edit
        </div>
        <div
          id={citem.space}
          onClick={() => {
            try {
              dispatch(removeItem({ productID: productDetails._id })).then(
                (data) => {
                  if (data.meta.requestStatus === "fulfilled") {
                    dispatch(removeAll({id: productDetails._id}));
                  } else if (data.meta.requestStatus === "rejected") {
                    setError(true);
                  }
                }
              );
            } catch (error) {
              setError(true);
            }
          }}
        >
          Remove
        </div>
        <div id={citem.space}>Save for Later</div>
      </div>
    </div>
  );
};

export default CartProd;
