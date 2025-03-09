import { createSlice } from "@reduxjs/toolkit";

const initialMailState = { receivedMails: [], sentMails: [] };

const mailboxSlice = createSlice({
    name: 'mailbox',
    initialState: initialMailState,
    reducers: {
        addMails(state, action) {
            const newMail = action.payload;
            if (newMail.type === 'sent') {
                state.sentMails.push(...state.sentMails, newMail);
            }
            else {
                state.receivedMails.push(...state.receivedMails, newMail);
            }
        },
        setMails(state, action) {
            const allMails = action.payload;
            state.receivedMails = allMails.filter(mail => mail.type === 'received');
            state.sentMails = allMails.filter(mail => mail.type === 'sent');
            console.log("redux received mails", state.receivedMails);
            console.log("redux sent mails", state.sentMails);
        },
    },
});

export default mailboxSlice;