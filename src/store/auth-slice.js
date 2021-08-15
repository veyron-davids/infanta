import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { list } from "../assests/states";
import {
  CREATE_ADDRESS,
  EDIT_ADDRESS,
  SET_DEFAULT,
  USER,
  ADD_ORDERS,
} from "../config";
import auth from "../services/authService";
import http from "../services/httpService";

const initialState = {
  userDetails: null,
  authenticated: true,
  address: null,
  selectedState: "",
  selectedCity: "",
  useCurrentAddress: false,
  loading: false,
  addressToEdit: null,
};

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const response = await http.get(USER);
  return response.data;
});
export const getAuth = createAsyncThunk("auth/getAuth", async () => {
  const response = await auth.getCurrentUser();
  return response;
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
export const AddOrders = createAsyncThunk("auth/AddOrders", async (data) => {
  const response = await http.post(ADD_ORDERS, data);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logUserOut(state, action) {
      state.authenticated = false;
      state.userDetails = null;
    },
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
  },

  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.userDetails = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.authenticated = false;
    },
    [getAuth.fulfilled]: (state, action) => {
      state.authenticated = true;
    },
    [getAuth.rejected]: (state, action) => {
      state.authenticated = false;
      state.userDetails = null;
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
  logUserOut,
  setAddressToUse,
  setDefaultAdd,
  setDefaultAddTwo,
  setNewAddress,
  getAddressToEdit,
} = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => state.auth.userDetails;
export const isAuth = (state) => state.auth.authenticated;
export const Useraddress = (state) => state.auth.address;
export const selectAddressTouse = (state) => state.auth.useCurrentAddress;
export const selectLoading = (state) => state.auth.loading;
export const selectAddressToEdit = (state) => state.auth.addressToEdit;
