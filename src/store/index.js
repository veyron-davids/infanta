import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import cartReducer from "./cart-slice";
import mobileReducer from "./mobile-slice";
import orderReducer from "./order-slice";
import productReducer from "./product-slice";
// import uploadReducer from "./upload-slice";

const store = configureStore({
  reducer: {
    products: productReducer,
    mobile: mobileReducer,
    cart: cartReducer,
    orders: orderReducer,
    auth: authReducer,
    // upload: uploadReducer,
  },
});

export default store;
