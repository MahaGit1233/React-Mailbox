import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { token: null };

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        signup(state, action) {
            state.token = action.payload.token;
        },
    },
});

export default authSlice;