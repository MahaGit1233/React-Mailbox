import { useState } from "react";
import { EditorState } from "draft-js";

const useMailboxForm = (onAddMail, onClose) => {
    const [enteredName, setEnteredName] = useState("");
    const [enteredMail, setEnteredMail] = useState("");
    const [enteredSubject, setEnteredSubject] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const nameChangeHandler = (event) => setEnteredName(event.target.value);
    const mailChangeHandler = (event) => setEnteredMail(event.target.value);
    const subjectChangeHandler = (event) => setEnteredSubject(event.target.value);

    const mailSubmitHandler = (event) => {
        event.preventDefault();

        if (!enteredName) return alert("Please enter the sender's name");
        if (!enteredMail) return alert("Please enter the recipient's email");
        if (!enteredSubject) return alert("Please add a subject");
        if (!editorState.getCurrentContent().hasText()) return alert("Please enter your mail");

        const newMail = {
            name: enteredName,
            mailId: enteredMail,
            subject: enteredSubject,
            text: editorState,
        };

        onAddMail(newMail);

        // Reset form fields after submission
        setEnteredName("");
        setEnteredMail("");
        setEnteredSubject("");
        setEditorState(EditorState.createEmpty());
    };

    return {
        enteredName,
        enteredMail,
        enteredSubject,
        editorState,
        nameChangeHandler,
        mailChangeHandler,
        subjectChangeHandler,
        setEditorState,
        mailSubmitHandler,
    };
};

export default useMailboxForm;
