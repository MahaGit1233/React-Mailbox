import React from "react";
import { Button, Card, Container, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import MailboxItems from "./MailboxItems";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/redux";

const Mails = () => {
    const location = useLocation();
    const data = location.state || {};

    const text = data.text || "";
    const name = data.name;
    const mail = data.mail;

    const parts = text.split(".");
    const greeting = parts[0] ? parts[0] + "." : "";
    const body = parts[1] ? parts[1] + "." : "";
    const closing = parts[2] ? parts[2].trim() : "";
    const senderEmail = parts[3] ? parts[3].trim() : "";
    const com = parts[4] ? parts[4].trim() : "";

    const dispatch = useDispatch();

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
                    <Card style={{ width: '25%', height: '40vh', marginLeft: '37%', backgroundColor: 'ButtonFace', border: 'none', marginTop: '10%' }}>
                        <div style={{ padding: '20px' }}>
                            <div style={{ padding: '10px', marginTop: '-2%', paddingBottom: '25px' }}>From: <strong>{name}</strong>
                                <div>To: {'<'}{mail}{'>'}</div>
                            </div>
                            <div style={{ paddingTop: '5.5%', paddingLeft: '2.5%', paddingRight: '2.5%' }}>
                                <div>{greeting} {body} {closing}</div>
                                <div style={{ marginTop: '5px', textAlign: 'right' }}>{senderEmail}.{com}.</div>
                            </div>
                        </div>
                    </Card>
                </Container>
            </div>
        </div>
    )
};

export default Mails;