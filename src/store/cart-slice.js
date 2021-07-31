import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADD_CART, GET_CART } from "../config";
import http from "../services/httpService";

const initialState = {
  cart: [],
  itemToAdd: "",
  success: false,
  loading: false,
  fail: false,
  open: false,
};

export const addToCart = createAsyncThunk(
  "products/addToCart",
  async (prod) => {
    const response = await http.post(ADD_CART, prod);
    console.log(response);
    return response.data.cart.items;
  }
);

export const fetchCart = createAsyncThunk("products/fetchCart", async () => {
  const response = await http.get(GET_CART);
  return response.data[0].cart.items;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleClick(state, action) {
      if (state.open === true) {
        state.open = false;
      } else {
        state.open = true;
      }
    },
    setItemToAdd(state, action) {
      state.itemToAdd = action.payload;
    },
    onSuccess(state) {
      state.success = false;
    },
    onError(state) {
      state.fail = false;
    },
    getCart(state, action) {
      state.cart = action.payload;
    },
  },
  extraReducers: {
    [addToCart.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
      state.fail = false;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.cartCount = 0;
      state.cart = action.payload;
      // state.cart.map((item) => {
      //   state.cartCount = Number(state.cartCount) + Number(item.quantity);
      // });
      state.loading = false;
      state.success = true;
      state.fail = false;
    },
    [addToCart.rejected]: (state, action) => {
      state.fail = true;
      state.success = false;
    },
    [fetchCart.fulfilled]: (state, action) => {
      state.cartCount = 0;
      state.cart = action.payload;
      // state.cart.map((item) => {
      //   state.cartCount = Number(state.cartCount) + Number(item.quantity);
      // });
    },
  },
});

export const {
  handleClick,
  setItemToAdd,
  onSuccess,
  onError,
  getCart,
  setSmallCount,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectOpen = (state) => state.cart.open;

export const selectItemToAdd = (state) => state.cart.itemToAdd;
export const selectSuccess = (state) => state.cart.success;
export const selectLoading = (state) => state.cart.loading;
export const selectFail = (state) => state.cart.fail;
export const selectCart = (state) => state.cart.cart;