import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { mailboxActions } from "../Store/redux";

const Inbox = () => {
    console.log('inbox is working');
    const dispatch = useDispatch();
    const receivedMails = useSelector(state => state.mailbox.receivedMails);
    const read = useSelector(state => state.mailbox.readMails);

    const readHandler = (id) => {
        dispatch(mailboxActions.readMails(id));
    };

    return (
        <div>
            {!receivedMails || receivedMails.length === 0 ? <p style={{ textAlign: "center", marginTop: "20px" }}>No mails available</p> : <div>
                {receivedMails.map((mail) => (
                    <NavLink to={{ pathname: '/mails', state: { text: mail.text, name: mail.senderName, mail: mail.mail } }} style={{ textDecoration: 'none' }} onClick={() => readHandler(mail.id)}>
                        <Card key={mail.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '8px', width: '100%', marginLeft: '0.5%', marginTop: '1%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '70%', gap: '3%' }}>
                                {!read.includes(mail.id) && <div style={{ color: 'blue', fontWeight: 'bold' }}>●</div>}
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '1.5%', width: '55%' }}><strong>{mail.senderName}</strong> {mail.subject}</div>
                            </div> {mail.date}
                        </Card>
                    </NavLink>
                ))}
            </div>}
        </div>
    )
};

export default Inbox;