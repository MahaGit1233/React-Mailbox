import React, { useState } from "react";
import { Button, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions, mailboxActions } from "../Store/redux";
import MailboxForm from "./MailboxForm";
import { convertToRaw } from "draft-js";

const Mailbox = () => {
    const [showMailbox, setShowMailbox] = useState(false);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());
    };

    const showMailboxHandler = () => {
        setShowMailbox(true);
    };

    const closeHandler = () => {
        setShowMailbox(false);
    };

    const addMailsHandler = async (mails) => {
        setShowMailbox(false);

        const senderEmail = localStorage.getItem('email').replace(/[.@]/g, '_');
        const receiverEmail = mails.mailId.replace(/[.@]/g, '_');

        const rawContent = convertToRaw(mails.text.getCurrentContent());

        const mailData = {
            sender: senderEmail,
            receiver: receiverEmail,
            mail: mails.mailId,
            subject: mails.subject,
            text: rawContent,
            date: new Date().toLocaleString(),
        };

        try {
            const senderResponse = await fetch(`https://mailbox-43158-default-rtdb.firebaseio.com/sent/${senderEmail}.json`, {
                method: 'POST',
                body: JSON.stringify(mailData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const senderData = await senderResponse.json();

            await fetch(`https://mailbox-43158-default-rtdb.firebaseio.com/receiver/${receiverEmail}.json`, {
                method: 'POST',
                body: JSON.stringify(mailData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            dispatch(mailboxActions.addMails({ id: senderData.name, ...mailData }));
            console.log("Mail sent successfully!")
            alert("Mail sent successfully!");
        } catch (error) {
            console.log(error);
            alert("Failed to send mail. Please try again.");
        }
    };

    return (
        <div>
            <Navbar className="bg-secondary justify-content-between" style={{ color: "white", display: 'flex', justifyContent: 'space-between' }}>
                <i style={{ marginLeft: '25px' }}>Welcome to Mailbox!</i>
                <Button style={{ marginRight: '10px' }} variant="outline-light" onClick={logoutHandler}>Logout</Button>
            </Navbar>
            {showMailbox && <MailboxForm onClose={closeHandler} onAddMail={addMailsHandler} />}
            {!showMailbox && <Button onClick={showMailboxHandler} style={{ position: 'fixed', bottom: '20px', right: '20px', border: 'none', borderRadius: '20px', fontSize: '18px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', cursor: 'pointer', transition: 'background 0.35' }} variant="dark">Compose ✎</Button>}
        </div>
    )
};

export default Mailbox;