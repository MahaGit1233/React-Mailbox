import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth";

const store = configureStore({
    reducer: { auth: authSlice.reducer }
});

export const authActions = authSlice.actions;

export default store;