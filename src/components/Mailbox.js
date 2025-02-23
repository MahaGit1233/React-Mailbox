import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "./Store/redux";

const Mailbox = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());
    };

    return (
        <div>
            <Navbar className="bg-secondary justify-content-between" style={{ color: "white" }}>
                <i>Welcome to Mailbox!</i>
                <Button variant="outline-light" onClick={logoutHandler}>Logout</Button>
            </Navbar>
        </div>
    )
};

export default Mailbox;