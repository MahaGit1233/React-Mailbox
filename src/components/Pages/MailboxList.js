import React from "react";
import { Card } from "react-bootstrap";

const MailboxList = (props) => {
    console.log(props.mails);

    return (
        <div>
            {!props.mails || props.mails.length === 0 ? <p style={{ textAlign: "center", marginTop: "20px" }}>No mails available</p> : <Card style={{ width: '100%', marginLeft: '0.5%', marginTop: '1%' }}>
                {props.mails.map((mail) => (
                    <li key={mail.id} style={{ display: 'flex', padding: '8px' }}>
                        <strong>{mail.senderName}</strong> {mail.subject}
                    </li>
                ))}
            </Card>}
        </div>
    )
};

export default MailboxList;