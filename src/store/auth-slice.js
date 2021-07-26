import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "../services/authService";

const initialState = [];

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const user = await auth.getCurrentUser();

  return user;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      return action.payload
    },
  },
});

export default authSlice.reducer;

export const selectUser = (state) => state.auth;
