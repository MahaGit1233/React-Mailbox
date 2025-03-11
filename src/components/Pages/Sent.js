import React, { useState } from "react";
import { Button, Card, Container, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import MailboxItems from "./MailboxItems";
import { authActions } from "../Store/redux";

const Sent = (props) => {
    const [isHover, setIsHover] = useState(null);

    console.log('sent is working');
    const sentMails = useSelector(state => state.mailbox.sentMails);
    const dispatch = useDispatch();

    const hoverInHandler = (id) => {
        setIsHover(id);
    };

    const hoverOutHandler = () => {
        setIsHover(null);
    };

    const logoutHandler = () => {
        dispatch(authActions.logout());
    };

    return (
        <div>
            <Navbar className="bg-secondary justify-content-between" style={{ color: "white", display: 'flex', justifyContent: 'space-between' }}>
                <i style={{ marginLeft: '25px' }}>Welcome to Mailbox!</i>
                <Button style={{ marginRight: '10px' }} variant="outline-light" onClick={logoutHandler}>Logout</Button>
            </Navbar>
            <div style={{ listStyleType: 'none', marginTop: '-4%', display: 'flex' }}>
                <Container style={{ border: 'none', marginTop: '5%', width: '17%', marginLeft: '2%', borderRadius: '10px', backgroundColor: 'whitesmoke' }}>
                    <MailboxItems />
                </Container>
                <Container style={{ border: 'none', height: '85vh', marginTop: '5%', width: '80%', borderRadius: '10px', backgroundColor: 'whitesmoke' }}>
                    <Navbar style={{ height: '7vh', backgroundColor: 'whitesmoke' }}>
                        <NavLink to="/" style={{ textDecoration: 'none', paddingLeft: '20px', fontSize: '30px', color: 'black' }}>←</NavLink>
                    </Navbar>
                    {!sentMails || sentMails.length === 0 ? <p style={{ textAlign: "center", marginTop: "20px" }}>No mails available</p> : <div>
                        {sentMails.map((mail) => (
                            <NavLink to={{ pathname: '/mails', state: { text: mail.text, name: mail.senderName, mail: mail.mail } }} style={{ textDecoration: 'none' }}>
                                <Card onMouseEnter={() => hoverInHandler(mail.id)} onMouseLeave={hoverOutHandler} key={mail.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '8px', width: '100%', marginLeft: '0.5%', marginTop: '1%' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1.5%', width: '55%' }}><strong>{mail.senderName}</strong> {mail.subject}</div>
                                    <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '5%', width: '25%' }}>
                                        {isHover === mail.id ? <Button variant="outline-dark" style={{ padding: '2px', border: 'none', paddingLeft: '5px', paddingRight: '5px', fontSize: '20px' }} onClick={(event) => {
                                            event.preventDefault();
                                            props.onDelete(mail.id, 'sent')
                                        }}>🗑</Button> : mail.date}
                                    </div>
                                </Card>
                            </NavLink>
                        ))}
                    </div>}
                </Container>
            </div>
        </div>
    )
};

export default Sent;