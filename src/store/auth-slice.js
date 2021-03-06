import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ADD_ORDERS,
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  EDIT_ADDRESS,
  SET_DEFAULT,
  USER,
} from "../config";
import http from "../services/httpService";

const initialState = {
  userDetails: null,
  address: null,
  selectedState: "",
  selectedCity: "",
  useCurrentAddress: false,
  addressToEdit: null,
};

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const response = await http.get(USER);
  return response.data;
});

export const updateUserAddress = createAsyncThunk(
  "auth/updateUserAddress",
  async (data) => {
    const response = await http.post(EDIT_ADDRESS, data);
    return response.data.response;
  }
);
export const setDefaultAddress = createAsyncThunk(
  "auth/setDefaultAddress",
  async (data) => {
    const response = await http.post(SET_DEFAULT, data);
    return response.data;
  }
);

export const CreateUserAddress = createAsyncThunk(
  "auth/CreateUserAddress",
  async (data) => {
    const response = await http.post(CREATE_ADDRESS, data);
    return response.data.response;
  }
);

export const RemoveAddress = createAsyncThunk(
  "auth/RemoveAddress",
  async (data) => {
    const response = await http.post(DELETE_ADDRESS, data);
    return response.data.response;
  }
);

export const AddOrders = createAsyncThunk("auth/AddOrders", async (data) => {
  const response = await http.post(ADD_ORDERS, data);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setDefaultAdd(state, action) {
      const { data } = action.payload;
      const updatedUser = state.userDetails;
      updatedUser.address.map((item) => {
        if (item._id == data) {
          item.default = true;
        } else {
          item.default = false;
        }
      });
      state.userDetails = updatedUser;
    },
    setAddressToUse(state, action) {
      if (action.payload === "Current Address") {
        state.useCurrentAddress = true;
      } else if (action.payload === "New Address") {
        state.useCurrentAddress = false;
      }
    },
    setNewAddress(state, action) {
      const { data } = action.payload;
      const updatedUser = state.userDetails;
      updatedUser.address.unshift(data);
      // if (updatedUser.address.length === 1) {
      //   updatedUser[0].default = true;
      // }
      state.userDetails = updatedUser;
    },
    getAddressToEdit(state, action) {
      const { id } = action.payload;
      state.userDetails.address.map((item) => {
        if (item._id == id) {
          state.addressToEdit = item;
        }
      });
    },
    removeAddress(state, action) {
      const { id } = action.payload;
      const addressIndex = state.userDetails.address.findIndex((cp) => {
        return cp._id.toString() == id.toString();
      });
      state.userDetails.address.splice(addressIndex, 1);
    },
  },

  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.userDetails = action.payload;
    },
    [updateUserAddress.fulfilled]: (state, action) => {
      state.userDetails.address = action.payload;
    },
    [CreateUserAddress.fulfilled]: (state, action) => {
      state.userDetails.delivery = action.payload;
    },
    [AddOrders.fulfilled]: (state, action) => {
      // state.userDetails.delivery = action.payload;
    },
  },
});

export const {
  setAddressToUse,
  setDefaultAdd,
  setDefaultAddTwo,
  setNewAddress,
  getAddressToEdit,
  removeAddress,
} = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => state.auth.userDetails;
export const Useraddress = (state) => state.auth.address;
export const selectAddressTouse = (state) => state.auth.useCurrentAddress;
export const selectAddressToEdit = (state) => state.auth.addressToEdit;
