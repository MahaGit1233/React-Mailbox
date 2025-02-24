import { createSlice } from "@reduxjs/toolkit";

const initialMailState = { mails: [] };

const mailboxSlice = createSlice({
    name: 'mailbox',
    initialState: initialMailState,
    reducers: {
        addMails(state, action) {
            state.mails.push(action.payload);
        },
    },
});

export default mailboxSlice;