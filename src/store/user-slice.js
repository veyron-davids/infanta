import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { list } from "../assests/states";
import { UPDATE_ADDRESS } from "../config";
import http from "../services/httpService";

const initialState = {
  states: Object.keys(list),
  LGA: list.Abia,
  delivery: {
    state: "",
    LGA: "",
  },
  userAddress: {},
  useCurrentAddress: false,
  updateSuccess: false,
  loading: false,
};

export const updateAddress = createAsyncThunk(
  "user/updateAddress",
  async (data) => {
    const response = await http.post(UPDATE_ADDRESS, data);
    console.log(response);
    return response.data.delivery;
  }
);

const userSlice = createSlice({
  name: "user",
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
    },
    setAddressToUse(state, action) {
      if (action.payload === "Current Address") {
        state.useCurrentAddress = true;
      } else if (action.payload === "New Address") {
        state.useCurrentAddress = false;
      } else if (action.payload === "---") {
        state.useCurrentAddress = false;
      }
    },
  },
  extraReducers: {
    [updateAddress.pending]: (state, action) => {
          state.loading = true;
    },
    [updateAddress.fulfilled]: (state, action) => {
      state.userAddress = action.payload;
        state.useCurrentAddress = true;
         state.loading = false;
    },
  },
});

export const { getState, setLGA, getLGA, setAddressToUse } = userSlice.actions;

export default userSlice.reducer;

export const selectLGA = (state) => state.user.LGA;
export const selectStates = (state) => state.user.states;
export const selectDelivery = (state) => state.user.delivery;
export const selectAddressTouse = (state) => state.user.useCurrentAddress;
export const selectLoading = (state) => state.user.loading;

