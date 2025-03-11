import React from "react";
import './Signup.css';
import { Alert, Button, Card, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useSignupForm from "./useSignup";
import useAuth from "./useAuth";

const Signup = () => {
    const {
        enteredMail,
        enteredPass,
        enteredConfirmPass,
        error,
        setError,
        mailChangeHandler,
        passChangeHandler,
        confirmPassChangeHandler,
        resetForm
    } = useSignupForm();

    const { isLogin, switchModeHandler, authenticateUser } = useAuth();

    const formSubmitHandler = (event) => {
        event.preventDefault();
        authenticateUser(enteredMail, enteredPass, setError, resetForm);
    };

    const signup = <Form className="form" onSubmit={formSubmitHandler}>
        <h1>Register</h1>
        <Form.Group>
            <Form.Label className="formlabel">Email Id:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="email" value={enteredMail} onChange={mailChangeHandler} placeholder="Enter your mail Id" />
        </Form.Group>
        <Form.Group>
            <Form.Label className="formlabel">Password:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="password" value={enteredPass} onChange={passChangeHandler} placeholder="Enter Password" />
        </Form.Group>
        <Form.Group>
            <Form.Label className="formlabel">Confirm Password:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="password" value={enteredConfirmPass} onChange={confirmPassChangeHandler} placeholder="Confirm your Password" />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="formBtn">
            <Button type="submit" variant="outline-dark">Sign Up</Button>
        </div>
    </Form>

    const login = <Form className="form1" onSubmit={formSubmitHandler}>
        <Form.Group>
            <Form.Label className="formlabel">Email Id:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="email" value={enteredMail} onChange={mailChangeHandler} placeholder="Enter your mail Id" />
        </Form.Group>
        <Form.Group>
            <Form.Label className="formlabel">Password:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="password" value={enteredPass} onChange={passChangeHandler} placeholder="Enter your Password" />
        </Form.Group>
        <div className="formBtn">
            <div>
                <NavLink to="/forgot-password">Forgot Password</NavLink>
            </div>
            <Button type="submit" variant="outline-dark">Login</Button>
        </div>
    </Form>

    return (
        <Card className="card">
            <Card.Body className="cardbody">
                {!isLogin ? <div className="body">
                    <div className="bodyItems">
                        <h1>Welcome!</h1>
                        <h5>Sign up to create an account</h5>
                        <Button onClick={switchModeHandler} variant="outline-dark">{isLogin ? "Don't have an account? Sign up" : " Already have an account? Login"}</Button>
                    </div>
                </div> :
                    <div className="body1">
                        <div className="bodyItems1">
                            <h1>Welcome Back!</h1>
                            <h5>Log In to proceed to your account</h5>
                            <Button onClick={switchModeHandler} variant="outline-dark">{isLogin ? "Don't have an account? Sign up" : " Already have an account? Login"}</Button>
                        </div>
                    </div>}
                <div className="signupform">
                    {isLogin ? login : signup}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Signup;