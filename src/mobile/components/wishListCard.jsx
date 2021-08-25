import React from "react";
import { IoMdTrash } from "react-icons/io";
import { usePaystackPayment } from "react-paystack";
import wish from "../css/profile.module.css";

const WishListCard = () => {
  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: 20000,
    publicKey: "pk_test_cd2e3fab775fb1a46cb0f23bc0935d599aba6a7b",
  };

  const initializePayment = usePaystackPayment(config);

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
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
            <span>PS3 Slim Console 320GB Plus 2 ...</span>
            <br />
            <br />
            <span>N2000</span>
            <br />
            <br />
            <span>Size: M</span>
          </div>
        </div>
      </div>
      <div className={wish.wishcard__container__levetwo}>
        <div id={wish.remove}>
          <IoMdTrash />
          <span>REMOVE</span>
        </div>
        <button
          className={wish.out}
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          BUY
        </button>
        {/* <button className={wish.buy}>OUT OF STOCK</button> */}
      </div>
    </div>
  );
};

export default WishListCard;
