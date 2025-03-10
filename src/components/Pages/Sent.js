import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sent = () => {
    console.log('sent is working');
    const sentMails = useSelector(state => state.mailbox.sentMails);

    return (
        <div>
            {!sentMails || sentMails.length === 0 ? <p style={{ textAlign: "center", marginTop: "20px" }}>No mails available</p> : <div>
                {sentMails.map((mail) => (
                    <NavLink to={{ pathname: '/mails', state: { text: mail.text, name: mail.senderName, mail: mail.mail } }} style={{ textDecoration: 'none' }}>
                        <Card key={mail.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '8px', width: '100%', marginLeft: '0.5%', marginTop: '1%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '1.5%', width: '55%' }}><strong>{mail.senderName}</strong> {mail.subject}</div> {mail.date}
                        </Card>
                    </NavLink>
                ))}
            </div>}
        </div>
    )
};

export default Sent;