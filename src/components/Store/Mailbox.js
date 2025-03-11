import { createSlice } from "@reduxjs/toolkit";

const initialMailState = { receivedMails: [], sentMails: [], readMails: JSON.parse(localStorage.getItem("readMails")) || [] };

const mailboxSlice = createSlice({
    name: 'mailbox',
    initialState: initialMailState,
    reducers: {
        addMails(state, action) {
            const newMail = action.payload;
            if (newMail.type === 'sent') {
                state.sentMails.push(newMail);
            }
            else {
                state.receivedMails.push({ ...newMail, read: false });
            }
        },
        setMails(state, action) {
            const allMails = action.payload;
            state.receivedMails = allMails.filter(mail => mail.type === 'received').map(mail => ({ ...mail, read: mail.read ?? false }));
            state.sentMails = allMails.filter(mail => mail.type === 'sent');

            console.log("redux received mails", state.receivedMails);
            console.log("redux sent mails", state.sentMails);
        },
        readMails(state, action) {
            const mailId = action.payload;
            if (!state.readMails.includes(mailId)) {
                state.readMails.push(mailId);
                localStorage.setItem("readMails", JSON.stringify(state.readMails));
            }
        },
        deleteMails(state, action) {
            const mailId = action.payload;
            state.receivedMails = state.receivedMails.filter(mail => mail.id !== mailId);
            state.sentMails = state.sentMails.filter(mail => mail.id !== mailId);
        },
    },
});

export default mailboxSlice;