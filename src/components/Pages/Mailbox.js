import React, { useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import MailboxForm from "./MailboxForm";
import MailboxItems from "./MailboxItems";
import Inbox from "./Inbox";
import Sent from "./Sent";
import { Route } from "react-router-dom";
import useAuth from "./MailboxuseAuth";
import useMailbox from "./useMailbox";

const Mailbox = () => {
    const [showMailbox, setShowMailbox] = useState(false);

    const showMailboxHandler = () => {
        setShowMailbox(true);
    };

    const closeHandler = () => {
        setShowMailbox(false);
    };

    const { logout } = useAuth();
    const { sendMail, deleteMail } = useMailbox();

    return (
        <div>
            <Navbar className="bg-secondary justify-content-between" style={{ color: "white", display: 'flex', justifyContent: 'space-between' }}>
                <i style={{ marginLeft: '25px' }}>Welcome to Mailbox!</i>
                <Button style={{ marginRight: '10px' }} variant="outline-light" onClick={logout}>Logout</Button>
            </Navbar>
            {showMailbox && <MailboxForm onClose={closeHandler} onAddMail={sendMail} />}
            {!showMailbox && <Button onClick={showMailboxHandler} style={{ position: 'fixed', bottom: '20px', right: '20px', border: 'none', borderRadius: '20px', fontSize: '18px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', cursor: 'pointer', transition: 'background 0.35' }} variant="dark">Compose ✎</Button>}
            <div style={{ listStyleType: 'none', marginTop: '-4%', display: 'flex' }}>
                <Container style={{ border: 'none', marginTop: '5%', width: '17%', marginLeft: '2%', borderRadius: '10px', backgroundColor: 'whitesmoke' }}>
                    <MailboxItems />
                </Container>
                <Container style={{ border: 'none', height: '85vh', marginTop: '5%', width: '80%', borderRadius: '10px', backgroundColor: 'whitesmoke' }}>
                    <Route path="/"><Inbox onDelete={deleteMail} /></Route>
                    <Route path="/sent"><Sent onDelete={deleteMail} /></Route>
                </Container>
            </div>
        </div>
    )
};

export default Mailbox;