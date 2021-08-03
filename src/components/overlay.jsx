import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import React from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import over from "../css/overlay.module.css";
import {
  addToCart,
  handleClick,
  OnAdd,
  onError,
  OnRemove,
  onSuccess,
  removeFromCart,
  selectFail,
  selectItemToAdd,
  selectLoading,
  selectProduct,
  selectSuccess,
} from "../store/cart-slice";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Overlay = () => {
  const item = useSelector(selectItemToAdd);
  const product = useSelector(selectProduct);
  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const error = useSelector(selectFail);
  const dispatch = useDispatch();

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

  function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const price = product.productId ? currencyFormat(product.productId.price) : 0;

  const refresh = () => {
    setTimeout(() => {
      window.location.reload();
      console.log("run");
    }, 1000);
  };

  // useEffect(() => {
  //   if (item !== "") {
  //     dispatch(setSlectedItem());
  //   }
  // }, []);

  return (
    <React.Fragment>
      {success && (
        <Snackbar
          open={success}
          autoHideDuration={2000}
          onClose={handleSuccessClose}
        >
          <Alert onClose={handleSuccessClose} severity="success">
            Processed Successfully!
          </Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={error}
          autoHideDuration={2000}
          onClose={handleErrorClose}
        >
          <Alert onClose={handleErrorClose} severity="error">
            Something went wrong!
          </Alert>
        </Snackbar>
      )}

      <div
        className={over.container}
        onClick={() =>
          dispatch(() => {
            handleClick();
            refresh();
          })
        }
      >
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
            <span>{price}</span>
          </div>
          <div className={over.overlay__list__icons}>
            <AiFillMinusSquare
              className={over.shadow}
              onClick={() => {
                dispatch(
                  removeFromCart({
                    size: "small",
                    productID: item,
                  })
                ).then((data) => {
                  if (data.payload) {
                    dispatch(OnRemove({ spec: "small", id: item }));
                  }
                });
              }}
            />
            {loading ? (
              <div className={over.ring}></div>
            ) : (
              <span>{product === null ? 0 : product.size.small}</span>
            )}
            <AiFillPlusSquare
              className={over.shadow}
              onClick={() => {
                dispatch(
                  addToCart({
                    size: "small",
                    productID: item,
                  })
                ).then((data) => {
                  if (data.payload) {
                    dispatch(OnAdd({ spec: "small", id: item }));
                  }
                });
              }}
            />
          </div>
        </div>
        <div className={over.overlay__list}>
          <div className={over.overlay__list__desc}>
            <span>M</span>
            <span>{price}</span>
          </div>
          <div className={over.overlay__list__icons}>
            <AiFillMinusSquare
              className={over.shadow}
              onClick={() => {
                dispatch(
                  removeFromCart({
                    size: "medium",
                    productID: item,
                  })
                ).then((data) => {
                  console.log(data);
                  if (data.payload) {
                    dispatch(OnRemove({ spec: "medium", id: item }));
                  }
                });
              }}
            />
            {loading ? (
              <div className={over.ring}></div>
            ) : (
              <span>{product === null ? 0 : product.size.medium}</span>
            )}
            <AiFillPlusSquare
              className={over.shadow}
              onClick={() => {
                dispatch(
                  addToCart({
                    size: "medium",
                    productID: item,
                  })
                ).then((data) => {
                  if (data.payload) {
                    dispatch(OnAdd({ spec: "medium", id: item }));
                  }
                });
              }}
            />
          </div>
        </div>
        <div className={over.overlay__list}>
          <div className={over.overlay__list__desc}>
            <span>L</span>
            <span>{price}</span>
          </div>
          <div className={over.overlay__list__icons}>
            <AiFillMinusSquare
              className={over.shadow}
              onClick={() => {
                dispatch(
                  removeFromCart({
                    size: "large",
                    productID: item,
                  })
                ).then((data) => {
                  console.log(data);
                  if (data.payload) {
                    dispatch(OnRemove({ spec: "large", id: item }));
                  }
                });
              }}
            />
            {loading ? (
              <div className={over.ring}></div>
            ) : (
              <span>{product === null ? 0 : product.size.large}</span>
            )}
            <AiFillPlusSquare
              className={over.shadow}
              onClick={() => {
                dispatch(
                  addToCart({
                    size: "large",
                    productID: item,
                  })
                ).then((data) => {
                  if (data.payload) {
                    dispatch(OnAdd({ spec: "large", id: item }));
                  }
                });
              }}
            />
          </div>
        </div>
        <div className={over.overlay__list}>
          <div className={over.overlay__list__desc}>
            <span>XL</span>
            <span>{price}</span>
          </div>
          <div className={over.overlay__list__icons}>
            <AiFillMinusSquare
              className={over.shadow}
              onClick={() => {
                dispatch(
                  removeFromCart({
                    size: "xlarge",
                    productID: item,
                  })
                ).then((data) => {
                  if (data.payload) {
                    dispatch(OnRemove({ spec: "xlarge", id: item }));
                  }
                });
              }}
            />
            {loading ? (
              <div className={over.ring}></div>
            ) : (
              <span>{product === null ? 0 : product.size.xlarge}</span>
            )}
            <AiFillPlusSquare
              className={over.shadow}
              onClick={() => {
                dispatch(
                  addToCart({
                    size: "xlarge",
                    productID: item,
                  })
                ).then((data) => {
                  if (data.payload) {
                    dispatch(OnAdd({ spec: "xlarge", id: item }));
                  }
                });
              }}
            />
          </div>
        </div>
        <div className={over.overlay__list}>
          <div className={over.overlay__list__desc}>
            <span>XXL</span>
            <span>{price}</span>
          </div>
          <div className={over.overlay__list__icons}>
            <AiFillMinusSquare
              className={over.shadow}
              onClick={() => {
                dispatch(
                  removeFromCart({
                    size: "xxlarge",
                    productID: item,
                  })
                ).then((data) => {
                  if (data.payload) {
                    dispatch(OnRemove({ spec: "xxlarge", id: item }));
                  }
                });
              }}
            />
            {loading ? (
              <div className={over.ring}></div>
            ) : (
              <span>{product === null ? 0 : product.size.xxlarge}</span>
            )}
            <AiFillPlusSquare
              className={over.shadow}
              onClick={() => {
                dispatch(
                  addToCart({
                    size: "xxlarge",
                    productID: item,
                  })
                ).then((data) => {
                  if (data.payload) {
                    dispatch(OnAdd({ spec: "xxlarge", id: item }));
                  }
                });
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
          <NavLink to="/cart/summary">
            <button
              className={over.overlay__buttons__two}
              onClick={() => dispatch(handleClick())}
            >
              VIEW CART AND CHECK OUT
            </button>
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Overlay;
