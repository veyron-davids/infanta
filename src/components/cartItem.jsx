import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "../components/overlay";
import citem from "../css/cartItem.module.css";
import { isAuth } from "../store/auth-slice";
import { fetchCart, selectCart, selectOpen } from "../store/cart-slice";
import CartProd from "./cartProd";
import Summary from "./summary";

const CartItem = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const currentUser = useSelector(isAuth);
  const open = useSelector(selectOpen);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <React.Fragment>
      {open && currentUser && <Overlay />}
      <div className={citem.container}>
        <div className={citem.container__one}>
          <div className={citem.container__title}>
            <li>Product Details</li>
            <li id={citem.push}>Quantity</li>
            <li id={citem.pad}>Price</li>
            <li>Total</li>
          </div>
          {cart.length === 0 ? (
            <span id={citem.empty}>Your cart is empty</span>
          ) : (
            cart &&
            cart.map((item) => (
              <CartProd key={item.productId._id} product={item} />
            ))
          )}
          {/* {cart &&
            cart.map((item) => (
              <CartProd key={item.productId._id} product={item} />
            ))} */}
        </div>
        <Summary title="PROCEED" open={true} />
      </div>
    </React.Fragment>
  );
};

export default CartItem;
