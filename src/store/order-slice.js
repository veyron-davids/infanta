import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADD_ORDERS, CLOSED_ORDERS, OPEN_ORDERS } from "../config";
import http from "../services/httpService";

const initialState = {
  openOrders: [],
  closedOrders: [],
};

export const AddOrders = createAsyncThunk("auth/AddOrders", async (data) => {
  const response = await http.post(ADD_ORDERS, data);
  return response.data;
});

export const getOpenOrders = createAsyncThunk(
  "auth/getOpenOrders",
  async () => {
    const response = await http.get(OPEN_ORDERS);
    return response.data.orders;
  }
);
export const getClosedOrders = createAsyncThunk(
  "auth/getClosedOrders",
  async () => {
    const response = await http.get(CLOSED_ORDERS);
    return response.data.orders;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [getOpenOrders.fulfilled]: (state, action) => {
      state.openOrders = action.payload;
    },
    [getClosedOrders.fulfilled]: (state, action) => {
      state.closedOrders = action.payload;
    },
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;

export const selectOpenOrders = (state) => state.orders.openOrders;
export const selectClosedOrders = (state) => state.orders.closedOrders;
