import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/redux";
import { Alert, Button, Form } from "react-bootstrap";
import "./Signup.css";

const Signup = () => {
    const [enteredMail, setEnteredMail] = useState('');
    const [enteredPass, setEnteredPass] = useState('');
    const [enteredConfirmPass, setEnteredConfirmPass] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const mailChangeHandler = (event) => {
        setEnteredMail(event.target.value);
    };

    const passChangeHandler = (event) => {
        setEnteredPass(event.target.value);
    };

    const confirmPassChangeHandler = (event) => {
        setEnteredConfirmPass(event.target.value);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();

        if (!enteredMail || !enteredPass || !enteredConfirmPass) {
            setError('All fileds are required to be filled');
            return;
        };

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVsqPBQ8Oojgju9UMhzM8IXxv1cIhiQWs', {
            method: 'POST',
            body: JSON.stringify({
                email: enteredMail,
                password: enteredPass,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            if (res.ok) {
                console.log('User has Successfully Signed Up');
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    alert(data.error.message);
                    console.log(data.error.message);
                })
            }
        }).then((data) => {
            console.log(data);
            dispatch(authActions.signup({ token: data.idToken }));
        }).catch((err) => {
            alert(err.message);
        });

        setEnteredMail('');
        setEnteredPass('');
        setEnteredConfirmPass('');
        setError('');

    }

    return (
        <div className="signupform">
            <Form className="form" onSubmit={formSubmitHandler}>
                <h1>Register</h1>
                <Form.Group>
                    <Form.Label className="formlabel">Email Id:</Form.Label>
                    <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="email" placeholder="Enter your mail Id" value={enteredMail} onChange={mailChangeHandler} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="formlabel">Password:</Form.Label>
                    <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="password" placeholder="Enter Password" value={enteredPass} onChange={passChangeHandler} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="formlabel">Confirm Password:</Form.Label>
                    <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="password" placeholder="Confirm your password" value={enteredConfirmPass} onChange={confirmPassChangeHandler} />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="formBtn">
                    <Button type="submit" variant="outline-dark">Sign Up</Button>
                </div>
            </Form>
        </div>
    )
};

export default Signup;