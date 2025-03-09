import React from "react";
import { Card, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Mails = () => {
    const location = useLocation();
    const data = location.state || {};

    const text = data.text || "";

    const parts = text.split(".");
    const greeting = parts[0] ? parts[0] + "." : "";
    const body = parts[1] ? parts[1] + "." : "";
    const closing = parts[2] ? parts[2].trim() : "";
    const senderEmail = parts[3] ? parts[3].trim() : "";
    const com = parts[4] ? parts[4].trim() : "";

    return (
        <div>
            <Navbar className="bg-secondary justify-content-between" style={{height:'7vh'}}>
                <NavLink to="/" style={{ textDecoration: 'none', paddingLeft: '20px', fontSize: '30px', color: 'white' }}>←</NavLink>
            </Navbar>
            <Card style={{ width: '20%', height: '30vh', marginLeft: '40%' }}>
                <div style={{ paddingTop: '5.5%', paddingLeft: '2.5%', paddingRight: '2.5%' }}>
                    <div>{greeting} {body} {closing}</div>
                    <div style={{ marginTop: '5px', textAlign: 'right' }}>{senderEmail}.{com}.</div>
                </div>
            </Card>
        </div>
    )
};

export default Mails;