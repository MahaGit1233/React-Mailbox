import React from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MailboxItems = () => {
    return (
        <div>
            <NavLink style={{ textDecoration: 'none' }} to='/'><Card style={{ width: '105%', marginLeft: '-3%', alignItems: 'center', paddingTop: '5px', paddingBottom: '5px', fontSize: '18px', marginTop: '5%', border: 'none' }}>Inbox</Card></NavLink>
            <NavLink style={{ textDecoration: 'none' }} to='/'><Card style={{ width: '105%', marginLeft: '-3%', alignItems: 'center', paddingTop: '5px', paddingBottom: '5px', fontSize: '18px', marginTop: '5%', border: 'none' }}>Sent</Card></NavLink>
        </div >
    );
};

export default MailboxItems;