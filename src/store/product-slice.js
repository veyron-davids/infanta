import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_VOGUE } from "../config";
import http from "../services/httpService";

const initialState = {
  products: [],
  grid: true,
  loading:false,
};
//PRODUCTS//

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await http.get(FETCH_VOGUE);
      localStorage.setItem("products", JSON.stringify(response.data.vogue));
      return response.data.vogue;
    } catch (error) {
      console.log(error);
      return JSON.parse(localStorage.getItem("products"));
    }
  }
);

// export const addToCart = createAsyncThunk(
//   "products/addToCart",
//   async (productId) => {
//     const prodId = {
//       prod: productId,
//     };
//     console.log(http.post);
//     const response = await http.post(ADD_CART, prodId);
//     return response.data.cart.items;
//   }
// );

// export const postCartUpdate = createAsyncThunk(
//   "products/update",
//   async (data) => {
//     const response = await http.post(UPDATE_CART, data);

//     return response.data.cart.items;
//   }
// );

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    switchView(state) {
      state.grid = !state.grid
    }
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.products = JSON.parse(localStorage.getItem("products"));
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    // [addToCart.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [addToCart.fulfilled]: (state, action) => {
    //   state.cartCount = 0;
    //   state.cart = action.payload;
    //   state.cart.map((item) => {
    //     state.cartCount = Number(state.cartCount) + Number(item.quantity);
    //   });
    //   state.loading = false;
    // },
    // [addToCart.rejected]: (state, action) => {
    //   state.loading = false;
    // },

    // [postCartUpdate.pending]: (state, action) => {
    //   state.fetching = true;
    // },
    // [postCartUpdate.fulfilled]: (state, action) => {
    //   state.cartCount = 0;
    //   state.cart = action.payload;
    //   state.cart.map((item) => {
    //     state.cartCount = Number(state.cartCount) + Number(item.quantity);
    //   });
    //   state.fetching = false;
    // },
    // [postCartUpdate.rejected]: (state, action) => {
    //   state.fetching = false;
    // },
  },
});

export const { getSlicedNext, switchView } = productSlice.actions;

export default productSlice.reducer;

export const selectAllProducts = (state) => state.products.products;
export const selectAllSlice = (state) => state.products.sliced;
export const selectLoading = (state) => state.products.loading;
export const selectGrid = (state) => state.products.grid;
