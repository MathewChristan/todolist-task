import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: JSON.parse(localStorage.getItem("user") ?? "{}"),
  // username: "Khatherine Jane",
  // profileImg:
  //   "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginHandler: (state, { payload }) => {
      localStorage.setItem("user", JSON.stringify(payload));
      localStorage.setItem("token", payload.accessToken);
      state.userDetails = payload;
    },
  },
});

export const { loginHandler } = userSlice.actions;

export default userSlice.reducer;
