import ReactDOM from 'react-dom';
import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './MailboxForm.css';
import useMailboxForm from "./useMailboxForm";

const Backdrop = (props) => {
    const {
        enteredName,
        enteredMail,
        enteredSubject,
        editorState,
        nameChangeHandler,
        mailChangeHandler,
        subjectChangeHandler,
        setEditorState,
        mailSubmitHandler,
    } = useMailboxForm(props.onAddMail, props.onClose);

    return (
        <div className="backdrop">
            <div className="mailbox">
                <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                    <Button onClick={props.onClose} style={{ border: 'none' }} variant="outline-dark">X</Button>
                    <h5 style={{ paddingTop: '10px', paddingLeft: '10px' }}>New Mail</h5>
                </div>
                <Form>
                    <InputGroup style={{ paddingLeft: '10px', paddingRight: '10px', borderBottom: '1px solid #e5e8e8' }}>
                        <InputGroup.Text style={{ backgroundColor: 'white', border: 'none' }}>From:</InputGroup.Text>
                        <Form.Control style={{ border: 'none' }} type="email" placeholder="Enter your name" value={enteredName} onChange={nameChangeHandler} />
                    </InputGroup>
                    <InputGroup style={{ paddingLeft: '10px', paddingRight: '10px', borderBottom: '1px solid #e5e8e8' }}>
                        <InputGroup.Text style={{ backgroundColor: 'white', border: 'none' }}>To:</InputGroup.Text>
                        <Form.Control style={{ border: 'none' }} type="email" placeholder="Recepients" value={enteredMail} onChange={mailChangeHandler} />
                    </InputGroup>
                    <Form.Group style={{ paddingLeft: '10px', paddingRight: '10px', borderBottom: '1px solid #e5e8e8' }}>
                        <Form.Control style={{ border: 'none' }} type="text" placeholder="Subject" value={enteredSubject} onChange={subjectChangeHandler} />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '-10px' }}>
                        <Editor editorState={editorState} onEditorStateChange={setEditorState} editorClassName="editorClassName" toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName" placeholder="Type your mail here" />
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