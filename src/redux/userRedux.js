import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    accessToken: sessionStorage.getItem("accessToken"),
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
     // console.log(state.developers)
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    changePasswordStart: (state) => {
      state.isFetching = true;
    },
    changePasswordSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
    },
    changePasswordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.accessToken = null;
      state.error = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
