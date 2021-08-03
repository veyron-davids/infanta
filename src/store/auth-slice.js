import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "../services/authService";
import { USER } from "../config";
import http from "../services/httpService";

const initialState = {
  userDetails: null,
  authenticated: false,
};

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const response = await http.get(USER);
  return response.data;
});
export const getAuth = createAsyncThunk("auth/getAuth", async () => {
  const response = await auth.getCurrentUser();
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {
    logUserOut(state, action) {
      state.authenticated = false;
      state.userDetails = null;
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
  },
});

export const { logUserOut } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => state.auth.userDetails;

export const isAuth = (state) => state.auth.authenticated;
