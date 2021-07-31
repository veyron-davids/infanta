import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import over from "../css/overlay.module.css";
import {
  addToCart,
  fetchCart,
  handleClick,
  onError,
  onSuccess,
  selectCart,
  selectFail,
  selectItemToAdd,
  selectLoading,
  selectSuccess,
} from "../store/cart-slice";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Overlay = () => {
  const item = useSelector(selectItemToAdd);
  const cart = useSelector(selectCart);
  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const error = useSelector(selectFail);
  const dispatch = useDispatch();
  const [small, setSmall] = useState(0);
  const [medium, setMedium] = useState(0);
  const [large, setLarge] = useState(0);
  const [XL, setXL] = useState(0);
  const [XXL, setXXL] = useState(0);

  const [gts, setGts] = useState(false);

  const smallIndex = cart.findIndex((it) => {
    const idx = it.productId == item && it.size == "small";
    if (idx >= 0) {
      return idx;
    }
  });
  const mediumIndex = cart.findIndex((it) => {
    const idx = it.productId == item && it.size == "m";
    if (idx >= 0) {
      return idx;
    }
  });
  const largeIndex = cart.findIndex((it) => {
    const idx = it.productId == item && it.size == "l";
    if (idx >= 0) {
      return idx;
    }
  });
  const XLIndex = cart.findIndex((it) => {
    const idx = it.productId == item && it.size == "xl";
    if (idx >= 0) {
      return idx;
    }
  });
  const XXLIndex = cart.findIndex((it) => {
    const idx = it.productId == item && it.size == "xxl";
    if (idx >= 0) {
      return idx;
    }
  });

  useEffect(() => {
    if (cart[mediumIndex]) setMedium(cart[mediumIndex].quantity);
    if (cart[largeIndex]) setLarge(cart[largeIndex].quantity);
    if (cart[XLIndex]) setXL(cart[XLIndex].quantity);
    if (cart[XXLIndex]) setXXL(cart[XXLIndex].quantity);
    dispatch(fetchCart());
  }, [dispatch, item, cart]);

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(onSuccess());
  };
  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(onError());
  };

  return (
    <React.Fragment>
      {success && (
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleSuccessClose}
        >
          <Alert onClose={handleSuccessClose} severity="success">
            Product has been added to cart!
          </Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={error}
          autoHideDuration={3000}
          onClose={handleErrorClose}
        >
          <Alert onClose={handleErrorClose} severity="error">
            Something went wrong!
          </Alert>
        </Snackbar>
      )}

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
            <AiFillMinusSquare className={over.shadow} disable />
            {gts ? (
              <div className={over.ring}></div>
            ) : (
              <span>{cart[smallIndex] && cart[smallIndex].quantity}</span>
            )}
            <AiFillPlusSquare
              className={over.shadow}
              onClick={() => {
                setGts(true);
                dispatch(
                  addToCart({
                    productID: item,
                    size: "small",
                  })
                );
                setGts(false);
              }}
            />
          </div>
        </div>
        <div className={over.overlay__list}>
          <div className={over.overlay__list__desc}>
            <span>M</span>
            <span>₦5,000</span>
          </div>
          <div className={over.overlay__list__icons}>
            <AiFillMinusSquare className={over.shadow} />
            {loading ? (
              <div className={over.ring}></div>
            ) : (
              <span>{medium}</span>
            )}
            <AiFillPlusSquare
              className={over.shadow}
              onClick={() => {
                dispatch(
                  addToCart({
                    productID: item,
                    size: "m",
                  })
                );
              }}
            />
          </div>
        </div>
        <div className={over.overlay__list}>
          <div className={over.overlay__list__desc}>
            <span>L</span>
            <span>₦5,000</span>
          </div>
          <div className={over.overlay__list__icons}>
            <AiFillMinusSquare className={over.shadow} />
            {loading ? <div className={over.ring}></div> : <span>{large}</span>}
            <AiFillPlusSquare
              className={over.shadow}
              onClick={() => {
                dispatch(
                  addToCart({
                    productID: item,
                    size: "l",
                  })
                );
              }}
            />
          </div>
        </div>
        <div className={over.overlay__list}>
          <div className={over.overlay__list__desc}>
            <span>XL</span>
            <span>₦5,000</span>
          </div>
          <div className={over.overlay__list__icons}>
            <AiFillMinusSquare className={over.shadow} />
            {loading ? <div className={over.ring}></div> : <span>{XL}</span>}
            <AiFillPlusSquare
              className={over.shadow}
              onClick={() => {
                dispatch(
                  addToCart({
                    productID: item,
                    size: "xl",
                  })
                );
              }}
            />
          </div>
        </div>
        <div className={over.overlay__list}>
          <div className={over.overlay__list__desc}>
            <span>XXL</span>
            <span>₦5,000</span>
          </div>
          <div className={over.overlay__list__icons}>
            <AiFillMinusSquare className={over.shadow} />
            {loading ? <div className={over.ring}></div> : <span>{XXL}</span>}
            <AiFillPlusSquare
              className={over.shadow}
              onClick={() => {
                dispatch(
                  addToCart({
                    productID: item,
                    size: "xxl",
                  })
                );
              }}
            />
          </div>
        </div>
        <div className={over.overlay__buttons}>
          <button
            className={over.overlay__buttons__one}
            onClick={() => dispatch(handleClick())}
          >
            CONTINUE SHOPPING
          </button>
          <button className={over.overlay__buttons__two}>
            VIEW CART AND CHECK OUT
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Overlay;
