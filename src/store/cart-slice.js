import { createSlice } from "@reduxjs/toolkit";
import { list } from "../assests/states";

const initialState = {
  states: Object.keys(list),
  LGA: list.Abia,
  delivery: {
    state: "",
    LGA: "",
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getState(state, action) {
      state.delivery.state = action.payload;
    },
    getLGA(state, action) {
      state.delivery.LGA = action.payload;
    },
    setLGA(state) {
         state.LGA = list[state.delivery.state];
    }
  },
  extraReducers: {
    // [fetchProducts.fulfilled]: (state, action) => {
    //   state.products = action.payload;
    // },
  },
});

export const { getState, setLGA, getLGA } = cartSlice.actions;

export default cartSlice.reducer;

export const selectLGA = (state) => state.cart.LGA;
export const selectStates = (state) => state.cart.states;




//.substr(3)