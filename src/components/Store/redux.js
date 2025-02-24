import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth";
import mailboxSlice from "./Mailbox";

const store = configureStore({
    reducer: { auth: authSlice.reducer, mailbox: mailboxSlice.reducer }
});

export const authActions = authSlice.actions;
export const mailboxActions = mailboxSlice.actions;

export default store;