import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useMailbox from "./inboxuseMailbox";

const Inbox = (props) => {
    const [isHover, setIsHover] = useState(null);

    console.log('inbox is working');

    const { receivedMails, read, readHandler } = useMailbox();

    const hoverInHandler = (id) => {
        setIsHover(id);
    };

    const hoverOutHandler = () => {
        setIsHover(null);
    };

    return (
        <div>
            {!receivedMails || receivedMails.length === 0 ? <p style={{ textAlign: "center", marginTop: "20px" }}>No mails available</p> : <div>
                {receivedMails.map((mail) => (
                    <NavLink to={{ pathname: '/mails', state: { text: mail.text, name: mail.senderName, mail: mail.mail } }} style={{ textDecoration: 'none' }} onClick={() => readHandler(mail.id)}>
                        <Card onMouseEnter={() => hoverInHandler(mail.id)} onMouseLeave={hoverOutHandler} key={mail.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '8px', width: '100%', marginLeft: '0.5%', marginTop: '1%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '70%', gap: '3%' }}>
                                {!read?.includes(mail.id) && <div style={{ color: 'blue', fontWeight: 'bold' }}>●</div>}
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '1.5%', width: '55%' }}><strong>{mail.senderName}</strong> {mail.subject}</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '5%', width: '25%' }}>
                                {isHover === mail.id ? <Button variant="outline-dark" style={{ padding: '2px', border: 'none', paddingLeft: '5px', paddingRight: '5px', fontSize: '20px' }} onClick={(event) => {
                                    event.preventDefault();
                                    props.onDelete(mail.id, 'received')
                                }}>🗑</Button> : mail.date}
                            </div>
                        </Card>
                    </NavLink>
                ))}
            </div>}
        </div>
    )
};

export default Inbox;