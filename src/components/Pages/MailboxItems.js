import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './MailboxItems.css';

const MailboxItems = () => {
    const unreadCount = useSelector(state => state.mailbox.receivedMails.filter(mail => !state.mailbox.readMails.includes(mail.id)).length);

    return (
        <div className="items">
            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} style={{ textDecoration: 'none' }} to='/'><Card style={{ width: '105%', marginLeft: '-3%', alignItems: 'left', paddingTop: '5px', paddingBottom: '5px', fontSize: '18px', marginTop: '5%', border: 'none', paddingLeft: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>Inbox<div style={{ fontSize: '15px', paddingRight: '10px' }}>Unread:{unreadCount}</div></Card></NavLink>
            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} style={{ textDecoration: 'none' }} to='/sent'><Card style={{ width: '105%', marginLeft: '-3%', alignItems: 'left', paddingTop: '5px', paddingBottom: '5px', fontSize: '18px', marginTop: '5%', border: 'none', paddingLeft: '10px' }}>Sent</Card></NavLink>
        </div >
    );
};

export default MailboxItems;