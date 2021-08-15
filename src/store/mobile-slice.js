import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  grid: true,
  open: false,
  openCookies: false
};

const mobileSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {
    switchView(state) {
      state.grid = !state.grid;
    },
    toggleDrawer(state) {
      state.open = !state.open;
    },
    toggleCookies(state) {
      state.openCookies = !state.openCookies;
    },
  },
  extraReducers: {},
});

export const { switchView, toggleDrawer, toggleCookies } = mobileSlice.actions;

export default mobileSlice.reducer;

export const selectGrid = (state) => state.mobile.grid;
export const selectOpen = (state) => state.mobile.open;
export const selectOpenCookies = (state) => state.mobile.openCookies;
