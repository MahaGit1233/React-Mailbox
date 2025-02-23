import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { token: localStorage.getItem('token'), isAuthenticated: !!localStorage.getItem('token'), isLogin: false };

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        signup(state, action) {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
        },
        login(state, action) {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
        toggle(state) {
            state.isLogin = !state.isLogin;
        }
    },
});

export default authSlice;