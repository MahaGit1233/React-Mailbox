import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Inbox = () => {
    console.log('inbox is working');
    const receivedMails = useSelector(state => state.mailbox.receivedMails);

    return (
        <div>
            {!receivedMails || receivedMails.length === 0 ? <p style={{ textAlign: "center", marginTop: "20px" }}>No mails available</p> : <div>
                {receivedMails.map((mail) => (
                    <NavLink to={{ pathname: '/mails', state: { text: mail.text } }} style={{ textDecoration: 'none' }}>
                        <Card key={mail.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '8px', width: '100%', marginLeft: '0.5%', marginTop: '1%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '1.5%', width: '55%' }}><strong>{mail.senderName}</strong> {mail.subject}</div> {mail.date}
                        </Card>
                    </NavLink>
                ))}
            </div>}
        </div>
    )
};

export default Inbox;