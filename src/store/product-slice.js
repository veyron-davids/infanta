import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_VOGUE } from "../config";
import http from "../services/httpService";

const initialState = {
  products: [],
  cart: [],
  loading: false,
  total: 0,
  cartCount: 0,
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
      console.log(error)
      return JSON.parse(localStorage.getItem("products"));
    }
  }
);

// export const fetchCart = createAsyncThunk("products/fetchCart", async () => {
//   const response = await http.get(GET_CART);
//   return response.data[0].cart.items;
// });

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
    getCartTotal(state, action) {
      state.cart.map((ctx) => {
        state.total =
          Number(ctx.productId.price * Number(ctx.quantity)) + state.total;
      });
    },

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
    // [fetchCart.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [fetchCart.fulfilled]: (state, action) => {
    //   state.cartCount = 0;
    //   state.cart = action.payload;
    //   state.cart.map((item) => {
    //     state.cartCount = Number(state.cartCount) + Number(item.quantity);
    //   });
    //   state.loading = false;
    // },
    // [fetchCart.rejected]: (state, action) => {
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

export const { getCartTotal, } = productSlice.actions;

export default productSlice.reducer;

export const selectAllProducts = (state) => state.products.products;
export const selectLoading = (state) => state.products.loading;
