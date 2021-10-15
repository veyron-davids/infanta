import React, { useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
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
} from "../../store/cart-slice";
import over from "../css/bottomDrawer.module.css";
import Buttons from "./button";
import DrawerItem from "./drawerItem";
import SnackError from "./snackError";

const BottomDrawer = () => {
  const item = useSelector(selectItemToAdd);
  const product = useSelector(selectProduct);
  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const error = useSelector(selectFail);
  const dispatch = useDispatch();
  const history = useHistory();
  const route = useLocation();

  function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  useEffect(() => {
    if (error === true) {
      setTimeout(() => {
        dispatch(onError());
      }, 5000);
    }
    if (success === true) {
      setTimeout(() => {
        dispatch(onSuccess());
      }, 5000);
    }
  }, [error, success]);

  const price = product.productId ? currencyFormat(product.productId.price) : 0;

  return (
    <div className={over.container}>
      <div
        className={over.container__one}
        onClick={() => dispatch(handleClick())}
      >
        {error && <SnackError msg="Something went wrong!" />}
        {success && (
          <div className={over.snack__success}>
            <IoMdCheckmarkCircleOutline /> <span>Processed successfully! </span>
          </div>
        )}
      </div>
      <div className={over.container__two}>
        <div className={over.title}>
          <span>Please select a variation</span>
          <MdClose
            onClick={() => dispatch(handleClick())}
            className={over.overlay__close}
          />
        </div>
        <div className={over.container__sizes}>
          <DrawerItem
            prefix="S"
            price={price}
            loading={loading}
            style={product.size.small === 0 ? over.opaque : ""}
            size={product === null ? 0 : product.size.small}
            dispatchAdd={() => {
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
            dispatchMinus={() => {
              if (product.size.small === 0) {
                return;
              }
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
          <DrawerItem
            prefix="M"
            price={price}
            loading={loading}
            style={product.size.medium === 0 ? over.opaque : ""}
            size={product === null ? 0 : product.size.medium}
            dispatchAdd={() => {
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
            dispatchMinus={() => {
              if (product.size.medium === 0) {
                return;
              }
              dispatch(
                removeFromCart({
                  size: "medium",
                  productID: item,
                })
              ).then((data) => {
                if (data.payload) {
                  dispatch(OnRemove({ spec: "medium", id: item }));
                } 
              });
            }}
          />
          <DrawerItem
            prefix="L"
            price={price}
            loading={loading}
            style={product.size.large === 0 ? over.opaque : ""}
            size={product === null ? 0 : product.size.large}
            dispatchAdd={() => {
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
            dispatchMinus={() => {
              if (product.size.large === 0) {
                return;
              }
              dispatch(
                removeFromCart({
                  size: "large",
                  productID: item,
                })
              ).then((data) => {
                if (data.payload) {
                  dispatch(OnRemove({ spec: "large", id: item }));
                } 
              });
            }}
          />
          <DrawerItem
            prefix="XL"
            price={price}
            loading={loading}
            style={product.size.xlarge === 0 ? over.opaque : ""}
            size={product === null ? 0 : product.size.xlarge}
            dispatchAdd={() => {
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
            dispatchMinus={() => {
              if (product.size.xlarge === 0) {
                return;
              }
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
          <DrawerItem
            prefix="XXL"
            loading={loading}
            price={price}
            style={product.size.xxlarge === 0 ? over.opaque : ""}
            size={product === null ? 0 : product.size.xxlarge}
            dispatchAdd={() => {
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
            dispatchMinus={() => {
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
        </div>
        <div className={over.buttons}>
          {route.pathname === "/" && (
            <Buttons id={over.space} style={over.but}>
              VIEW CART AND CHECKOUT
            </Buttons>
          )}
          <Buttons
            id={over.space__two}
            style={over.but}
            onClick={() => {
              // history.push("/");
              window.location = "/";
            }}
          >
            CONTINUE SHOPPING
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default BottomDrawer;
