import React, { useEffect, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions, mailboxActions } from "../Store/redux";
import MailboxForm from "./MailboxForm";
import { convertFromRaw, convertToRaw } from "draft-js";
import MailboxItems from "./MailboxItems";
import Inbox from "./Inbox";
import Sent from "./Sent";
import { Route } from "react-router-dom";

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

    const extractPlainText = (rawText) => {
        console.log("Raw Text:", rawText);
        const fixedRawText = { ...rawText, entityMap: rawText.entityMap || {} };
        console.log(fixedRawText);

        try {
            const contentState = convertFromRaw(fixedRawText);
            const plainText = contentState.getPlainText();
            console.log("Extracted Plain Text:", plainText);
            return plainText;
        } catch (error) {
            console.error("convertFromRaw error:", error);
            return "Conversion failed";
        }
    };

    useEffect(() => {
        const fetchReceivedMails = async () => {
            const storedEmail = localStorage.getItem('email');

            const email = storedEmail.replace(/[.@]/g, '_');

            try {
                const receiverResponse = await fetch(`https://mailbox-43158-default-rtdb.firebaseio.com/receiver/${email}.json`, {
                    method: 'GET',
                });

                const receiverData = await receiverResponse.json();

                const receivedMails = receiverData ? Object.entries(receiverData).map(([id, mail]) => ({
                    id,
                    ...mail,
                    text: extractPlainText(mail.text),
                    type: 'received',
                })) : [];

                const senderResponse = await fetch(`https://mailbox-43158-default-rtdb.firebaseio.com/sent/${email}.json`, {
                    method: 'GET',
                });

                const senderData = await senderResponse.json();

                const senderMails = senderData ? Object.entries(senderData).map(([id, mail]) => ({
                    id,
                    ...mail,
                    text: extractPlainText(mail.text),
                    type: 'sent'
                })) : [];

                console.log("received mails", receivedMails);
                console.log("sent mails", senderMails);

                dispatch(mailboxActions.setMails([...receivedMails, ...senderMails]));

            } catch (error) {
                console.log(error);
            }
        };

        fetchReceivedMails();

    }, [dispatch]);

    const addMailsHandler = async (mails) => {
        setShowMailbox(false);

        const senderEmail = localStorage.getItem('email').replace(/[.@]/g, '_');
        const receiverEmail = mails.mailId.replace(/[.@]/g, '_');

        const rawContent = convertToRaw(mails.text.getCurrentContent());

        const mailData = {
            senderName: mails.name,
            sender: senderEmail.replace(/_/g, '.').replace('.', '@'),
            receiver: receiverEmail.replace(/_/g, '.').replace('.', '@'),
            mail: mails.mailId,
            subject: mails.subject,
            text: rawContent,
            date: new Date().toLocaleString(),
            type: 'sent',
        };

        try {
            const senderResponse = await fetch(`https://mailbox-43158-default-rtdb.firebaseio.com/sent/${senderEmail}.json`, {
                method: 'POST',
                body: JSON.stringify(mailData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const reveivedMail = { ...mailData, type: 'received' };
            await fetch(`https://mailbox-43158-default-rtdb.firebaseio.com/receiver/${receiverEmail}.json`, {
                method: 'POST',
                body: JSON.stringify(reveivedMail),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const senderData = await senderResponse.json();
            // const receiverData = await receiverResponse.json();

            // console.log(senderData);
            dispatch(mailboxActions.addMails({ id: senderData.name, ...mailData }));
            // dispatch(mailboxActions.addMails({ id: receiverData.name, ...mailData, type: 'received' }));

            console.log("Mail sent successfully!")
            alert("Mail sent successfully!");
        } catch (error) {
            console.log(error);
            alert("Failed to send mail. Please try again.");
        }
    };

    const deleteMailHandler = async (id, type) => {
        const senderEmail = localStorage.getItem('email').replace(/[.@]/g, '_');

        const url = type === 'sent' ? `https://mailbox-43158-default-rtdb.firebaseio.com/sent/${senderEmail}/${id}.json` : `https://mailbox-43158-default-rtdb.firebaseio.com/receiver/${senderEmail}/${id}.json`;

        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(mailboxActions.deleteMails(id));
    }

    return (
        <div>
            <Navbar className="bg-secondary justify-content-between" style={{ color: "white", display: 'flex', justifyContent: 'space-between' }}>
                <i style={{ marginLeft: '25px' }}>Welcome to Mailbox!</i>
                <Button style={{ marginRight: '10px' }} variant="outline-light" onClick={logoutHandler}>Logout</Button>
            </Navbar>
            {showMailbox && <MailboxForm onClose={closeHandler} onAddMail={addMailsHandler} />}
            {!showMailbox && <Button onClick={showMailboxHandler} style={{ position: 'fixed', bottom: '20px', right: '20px', border: 'none', borderRadius: '20px', fontSize: '18px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', cursor: 'pointer', transition: 'background 0.35' }} variant="dark">Compose ✎</Button>}
            <div style={{ listStyleType: 'none', marginTop: '-4%', display: 'flex' }}>
                <Container style={{ border: 'none', marginTop: '5%', width: '17%', marginLeft: '2%', borderRadius: '10px', backgroundColor: 'whitesmoke' }}>
                    <MailboxItems />
                </Container>
                <Container style={{ border: 'none', height: '85vh', marginTop: '5%', width: '80%', borderRadius: '10px', backgroundColor: 'whitesmoke' }}>
                    <div>
                        <h5 style={{ marginLeft: '50%', paddingTop: '10px' }}>INBOX</h5>
                        <Route path="/"><Inbox onDelete={deleteMailHandler} /></Route>
                    </div>
                    <div style={{ borderBottom: '1px solid black', padding: '10px' }}></div>
                    <div>
                        <h5 style={{ marginLeft: '50%', paddingTop: '10px' }}>SENT</h5>
                        <Route path="/"><Sent onDelete={deleteMailHandler} /></Route>
                    </div>
                </Container>
            </div>
        </div>
    )
};

export default Mailbox;