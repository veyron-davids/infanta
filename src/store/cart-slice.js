import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADD_CART, GET_CART, REMOVE_CART, REMOVE_ITEM } from "../config";
import http from "../services/httpService";

const initialState = {
  cart: [],
  products: [],
  itemToAdd: {
    id: "",
    productSelected: {
      productId: null,
      size: {
        small: 0,
        medium: 0,
        large: 0,
        xlarge: 0,
        xxlarge: 0,
      },
      total: 0,
    },
  },
  success: false,
  loading: false,
  fail: false,
  open: false,
  cartCount: 0,
  totalQty: 0,
  totalAmt: 0,
};

export const addToCart = createAsyncThunk(
  "products/addToCart",
  async (prod) => {
    const response = await http.post(ADD_CART, prod);
    return response.data.response;
  }
);
export const removeFromCart = createAsyncThunk(
  "products/removeFromCart",
  async (prod) => {
    const response = await http.post(REMOVE_CART, prod);
    return response.data.response;
  }
);
export const removeItem = createAsyncThunk(
  "products/removeItem",
  async (prod) => {
    const response = await http.post(REMOVE_ITEM, prod);
    return response.data.response;
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
      state.itemToAdd.id = action.payload;
      const index = state.cart.findIndex((item) => {
        return item.productId["_id"] == state.itemToAdd.id;
      });
      if (index >= 0) {
        state.itemToAdd.productSelected = {
          productId: state.cart[index].productId,
          size: {
            small: state.cart[index].size.small,
            medium: state.cart[index].size.medium,
            large: state.cart[index].size.large,
            xlarge: state.cart[index].size.xlarge,
            xxlarge: state.cart[index].size.xxlarge,
          },
          total: state.cart[index].total,
        };
      } else {
        const indexed = state.products.findIndex((item) => {
          return item._id == state.itemToAdd.id;
        });
        state.itemToAdd.productSelected = {
          productId: state.products[indexed],
          size: {
            small: 0,
            medium: 0,
            large: 0,
            xlarge: 0,
            xxlarge: 0,
          },
          total: 0,
        };
      }
    },
    setSlectedItem(state, action) {
      // const index = state.cart.findIndex((item) => {
      //   return item.productId["_id"] == state.itemToAdd.id;
      // });
      // if (index >= 0) {
      //   state.itemToAdd.productSelected = state.cart.find((element) => {
      //     return element.productId["_id"] == state.itemToAdd;
      //   });
      // }
    },

    getProduct(state, action) {
      state.products = JSON.parse(localStorage.getItem("products"));
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
    OnAdd(state, action) {
      const { spec, id } = action.payload;
      const cartProductIndex = state.cart.findIndex((cp) => {
        return cp.productId._id == id;
      });
      const currentProduct = state.itemToAdd.productSelected;
      const productIndex = state.cart[cartProductIndex];
      if (cartProductIndex >= 0) {
        currentProduct.size[spec] = currentProduct.size[spec] + 1;
        currentProduct.total = currentProduct.total + 1;
        productIndex.size[spec] = productIndex.size[spec] + 1;
        productIndex.total = productIndex.total + 1;
      } else {
        currentProduct.size[spec] = currentProduct.size[spec] + 1;
        currentProduct.total = currentProduct.total + 1;
        state.cart.push(currentProduct);
      }
      state.cartCount = 0;
      state.totalAmt = 0;
      state.cart.map((item) => {
        state.cartCount = Number(state.cartCount) + Number(item.total);
        state.totalAmt =
          Number(item.total) *
            Number(item.productId ? item.productId.price : 0) +
          Number(state.totalAmt);
      });

      state.loading = false;
      state.success = true;
      state.fail = false;
    },

    OnRemove(state, action) {
      const { spec, id } = action.payload;
      const cartProductIndex =
        state.cart.length !== 0 &&
        state.cart.findIndex((cp) => {
          return cp.productId._id == id;
        });
      const currentProduct = state.itemToAdd.productSelected;
      const productIndex = state.cart[cartProductIndex];

      if (cartProductIndex >= 0 && currentProduct.size[spec] > 1) {
        currentProduct.size[spec] = currentProduct.size[spec] - 1;
        currentProduct.total = currentProduct.total - 1;
        productIndex.size[spec] = productIndex.size[spec] - 1;
        productIndex.total = productIndex.total - 1;
      } else if (
        cartProductIndex >= 0 &&
        currentProduct.total !== 1 &&
        currentProduct.size[spec] == 1
      ) {
        currentProduct.size[spec] = currentProduct.size[spec] - 1;
        currentProduct.total = currentProduct.total - 1;
        productIndex.size[spec] = productIndex.size[spec] - 1;
        productIndex.total = productIndex.total - 1;
      } else if (cartProductIndex >= 0 && currentProduct.total === 1) {
        currentProduct.size[spec] = currentProduct.size[spec] - 1;
        currentProduct.total = currentProduct.total - 1;
        for (let i = 0; i <= state.cart.length; i++) {
          if (state.cart[i].productId._id == id) state.cart.splice(i, 1);
        }
      }
      state.cartCount = 0;
      state.totalAmt = 0;
      state.cart.map((item) => {
        state.cartCount = Number(state.cartCount) + Number(item.total);
        state.totalAmt =
          Number(item.total) *
            Number(item.productId ? item.productId.price : 0) +
          Number(state.totalAmt);
      });
      state.loading = false;
      state.success = true;
      state.fail = false;
    },
    removeAll(state, action) {
      const { id } = action.payload;
      const cartProductIndex =
        state.cart.length !== 0 &&
        state.cart.findIndex((cp) => {
          return cp.productId._id == id;
        });

      state.cart.splice(cartProductIndex, 1);
      state.cartCount = 0;
      state.totalAmt = 0;
      state.cart.map((item) => {
        state.cartCount = Number(state.cartCount) + Number(item.total);
        state.totalAmt =
          Number(item.total) *
            Number(item.productId ? item.productId.price : 0) +
          Number(state.totalAmt);
      });
    },
    emptyCart(state, action) {
      state.cart = [];
    },
  },

  extraReducers: {
    [addToCart.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
      state.fail = false;
    },
    [addToCart.fulfilled]: (state, action) => {
      // state.cart = action.payload;
      state.cartCount = 0;
      state.cart.map((item) => {
        state.cartCount = Number(state.cartCount) + Number(item.total);
      });
      // state.loading = false;
      // state.success = true;
      // state.fail = false;
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false;
      state.fail = true;
      state.success = false;
    },
    [removeFromCart.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
      state.fail = false;
    },

    [removeFromCart.fulfilled]: (state, action) => {
      // state.cart = action.payload;
      state.cartCount = 0;
      state.cart.map((item) => {
        state.cartCount = Number(state.cartCount) + Number(item.total);
      });
      // state.loading = false;
      // state.success = true;
      // state.fail = false;
    },
    [removeFromCart.rejected]: (state, action) => {
      state.loading = false;
      state.fail = true;
      state.success = false;
    },
    [fetchCart.fulfilled]: (state, action) => {
      state.cartCount = 0;
      state.totalAmt = 0;
      state.cart = action.payload;
      state.cart.map((item) => {
        state.cartCount = Number(state.cartCount) + Number(item.total);
        state.totalAmt =
          Number(item.total) * Number(item.productId.price) +
          Number(state.totalAmt);
      });
    },
  },
});

export const {
  handleClick,
  setItemToAdd,
  setSlectedItem,
  onSuccess,
  onError,
  getCart,
  setSmallCount,
  OnAdd,
  OnRemove,
  getProduct,
  removeAll,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectOpen = (state) => state.cart.open;

export const selectItemToAdd = (state) => state.cart.itemToAdd.id;
export const selectSuccess = (state) => state.cart.success;
export const selectLoading = (state) => state.cart.loading;
export const selectFail = (state) => state.cart.fail;
export const selectCart = (state) => state.cart.cart;
export const selectCartCount = (state) => state.cart.cartCount;
export const selectCartAmount = (state) => state.cart.totalAmt;
export const selectProduct = (state) => state.cart.itemToAdd.productSelected;
