import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import React from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import over from "../css/overlay.module.css";
import { handleClick } from "../store/product-slice";

const Overlay = () => {
  const dispatch = useDispatch();

  const config = {
    public_key: "FLWPUBK-0495d651437d10dea892e04e98e09dcd-X",
    tx_ref: Date.now(),
    amount: 100,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd,banktransfer,account,mpesa",
    customer: {
      name: "joel ugwumadu",
      email: "user@gmail.com",
      phonenumber: "07064586146",
    },
    customizations: {
      title: "Infanta Global Wears",
      description: "Payment for items in cart",
      logo: "https://shopper-io-bucket.s3.us-east-2.amazonaws.com/In..svg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <React.Fragment>
      <div className={over.container} onClick={() => dispatch(handleClick())}>
        {" "}
      </div>
      <div className={over.container__inside}>
        <div className={over.overlay__title}>
          <span>Please select a variation</span>
          <MdClose
            onClick={() => dispatch(handleClick())}
            className={over.overlay__close}
          />
        </div>
        <div className={over.overlay__list}>
          <div className={over.overlay__list__desc}>
            <span>S</span>
            <span>₦5,000</span>
          </div>
          <div className={over.overlay__list__icons}>
            <AiFillMinusSquare className={over.shadow} disabled />
            <span>0</span>
            <AiFillPlusSquare className={over.shadow} />
          </div>
        </div>
        <div className={over.overlay__list}>
          <div className={over.overlay__list__desc}>
            <span>M</span>
            <span>₦5,000</span>
          </div>
          <div className={over.overlay__list__icons}>
            <AiFillMinusSquare className={over.shadow} />
            <span>0</span>
            <AiFillPlusSquare className={over.shadow} />
          </div>
        </div>
        <div className={over.overlay__list}>
          <div className={over.overlay__list__desc}>
            <span>L</span>
            <span>₦5,000</span>
          </div>
          <div className={over.overlay__list__icons}>
            <AiFillMinusSquare className={over.shadow} />
            <span>0</span>
            <AiFillPlusSquare className={over.shadow} />
          </div>
        </div>
        <div className={over.overlay__list}>
          <div className={over.overlay__list__desc}>
            <span>XL</span>
            <span>₦5,000</span>
          </div>
          <div className={over.overlay__list__icons}>
            <AiFillMinusSquare className={over.shadow} />
            <span>0</span>
            <AiFillPlusSquare className={over.shadow} />
          </div>
        </div>
        <div className={over.overlay__list}>
          <div className={over.overlay__list__desc}>
            <span>XXL</span>
            <span>₦5,000</span>
          </div>
          <div className={over.overlay__list__icons}>
            <AiFillMinusSquare className={over.shadow} />
            <span>0</span>
            <AiFillPlusSquare className={over.shadow} />
          </div>
        </div>
        <div className={over.overlay__buttons}>
          <button
            className={over.overlay__buttons__one}
            onClick={() => dispatch(handleClick())}
          >
            CONTINUE SHOPPING
          </button>
          <button
            className={over.overlay__buttons__two}
            onClick={() =>
              handleFlutterPayment({
                callback: (response) => {
                  console.log(response);
                  closePaymentModal(); // this will close the modal programmatically
                },
                onClose: () => {},
              })
            }
          >
            VIEW CART AND CHECK OUT
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Overlay;
