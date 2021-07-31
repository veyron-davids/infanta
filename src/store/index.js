import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import cartReducer from "./cart-slice";
import productReducer from "./product-slice";
import userReducer from "./user-slice";
// import uploadReducer from "./upload-slice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    auth: authReducer,
    // upload: uploadReducer,
  },
});

export default store;
