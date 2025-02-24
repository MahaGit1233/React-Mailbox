import { EditorState } from "draft-js";
import ReactDOM from 'react-dom';
import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './MailboxForm.css';

const Backdrop = (props) => {
    const [enteredMail, setEnteredMail] = useState('');
    const [enteredSubject, setEnteredSubject] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const mailChangeHandler = (event) => {
        setEnteredMail(event.target.value);
    };

    const subjectChangeHandler = (event) => {
        setEnteredSubject(event.target.value);
    };

    const mailSubmitHandler = (event) => {
        event.preventDefault();

        const Mails = {
            mailId: enteredMail,
            subject: enteredSubject,
            text: editorState,
        };

        if (enteredMail.length === 0) {
            alert("Please give mail Id");
        }
        if (enteredSubject.length === 0) {
            alert("Please add subject to the mail");
        }
        if (!editorState.getCurrentContent().hasText()) {
            alert("Please enter your mail");
        }
        else {
            props.onAddMail(Mails);
        }

        setEnteredMail('');
        setEnteredSubject('');
        setEditorState('');
    }

    return (
        <div className="backdrop">
            <div className="mailbox">
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Button onClick={props.onClose} style={{ border: 'none' }} variant="outline-dark">X</Button>
                </div>
                <Form>
                    <InputGroup style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <InputGroup.Text>To:</InputGroup.Text>
                        <Form.Control style={{ borderBottom: '1px solid gray' }} type="email" placeholder="Recepients" value={enteredMail} onChange={mailChangeHandler} />
                    </InputGroup>
                    <Form.Group style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <Form.Control style={{ borderBottom: '1px solid gray' }} type="text" placeholder="Subject" value={enteredSubject} onChange={subjectChangeHandler} />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '-10px' }}>
                        <Editor editorState={editorState} onEditorStateChange={setEditorState} toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName" editorClassName="editorClassName" />
                        <div style={{ display: 'flex', flexDirection: 'row-reverse', paddingBottom: '10px', paddingRight: '15px' }}>
                            <Button onClick={mailSubmitHandler} style={{ borderRadius: '20px' }}>Send</Button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
};

const MailboxForm = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClose={props.onClose} onAddMail={props.onAddMail} />,
                document.getElementById("backdrop-root")
            )}
        </React.Fragment>
    );
};

export default MailboxForm;