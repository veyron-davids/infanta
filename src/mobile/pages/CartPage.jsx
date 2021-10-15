import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCart,
  selectOpen,
  selectCartAmount,
} from "../../store/cart-slice";
import { selectAllProducts } from "../../store/product-slice";
import BottomDrawer from "../components/bottomDrawer";
import Footer from "../components/footer";
import PreCard from "../components/preCard";
import ProfileTitle from "../components/profileTitle";
import Buttons from "../components/button";
import { useHistory } from "react-router-dom";
import Random from "../components/random";
import SnackError from "../components/snackError";
import WishListCard from "../components/wishListCard";
import crt from "../css/cart.module.css";

const CartPage = () => {
  const cart = useSelector(selectCart);
  const open = useSelector(selectOpen);
  const products = useSelector(selectAllProducts);
  const [error, setError] = useState(false);
  const totalAmt = useSelector(selectCartAmount);
  const history = useHistory()

  const handleError = () => [setError(!error)];

    function currencyFormat(num) {
      return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  
    const charge = currencyFormat(totalAmt);

  useEffect(() => {
    if (error === true) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [error]);

  return (
    <div className={crt.cart__container}>
      {open && <BottomDrawer />}
      <div className={crt.cart__inside}>
        {error && <SnackError msg="Maximum number of address reached" />}
        <ProfileTitle locations="/profile" title="Cart" />
        {cart &&
          cart.map((item) => (
            <WishListCard
              key={item.productId._id}
              product={item}
              handleError={handleError}
            />
          ))}
      </div>
      {cart.length === 0 && <span id={crt.empty}>Your cart is empty</span>}
      <div>
      {cart.length > 0 && (
        <div className={crt.pay}>
          <div className={crt.pay__head}>
            <span>Total</span>
            <span>{charge}</span>
          </div>
          <div>
            <Buttons
              id={crt.space__two}
              style={crt.but}
              onClick={() => {
                history.push("/cart/delivery-details");
              }}
            >
              COMPLETE YOUR ORDER
            </Buttons>
          </div>
        </div>
      )}
        <div className={crt.collections}>
          <Random title="Recommended For You">
            {products &&
              products
                .slice(0, 10)
                .map((item) => <PreCard key={item._id} product={item} />)}
          </Random>
        </div>
        <br />
        <Footer />
      </div>
    </div>
  );
};

export default CartPage;
