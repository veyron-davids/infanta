import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  products: [],
  cart: [],
  loading: false,
  total: 0,
  cartCount: 0,
  open: false,
};
//PRODUCTS//

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const response = await http.get("");
//     return response.data.products;
//   }
// );

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

    handleClick(state) {
      if (state.open === true) {
        state.open = false;
      } else {
        state.open = true;
      }
    },
  },
  extraReducers: {
    // [fetchProducts.fulfilled]: (state, action) => {
    //   state.products = action.payload;
    // },

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

export const { getCartTotal, handleClick } = productSlice.actions;

export default productSlice.reducer;

export const selectAllProducts = (state) => state.products.products;
export const selectLoading = (state) => state.products.loading;
export const selectOpen = (state) => state.products.open;
