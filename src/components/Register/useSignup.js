import { useState } from "react";

const useSignupForm = () => {
    const [enteredMail, setEnteredMail] = useState('');
    const [enteredPass, setEnteredPass] = useState('');
    const [enteredConfirmPass, setEnteredConfirmPass] = useState('');
    const [error, setError] = useState('');

    const mailChangeHandler = (event) => setEnteredMail(event.target.value);
    const passChangeHandler = (event) => setEnteredPass(event.target.value);
    const confirmPassChangeHandler = (event) => setEnteredConfirmPass(event.target.value);

    const resetForm = () => {
        setEnteredMail('');
        setEnteredPass('');
        setEnteredConfirmPass('');
        setError('');
    };

    return {
        enteredMail,
        enteredPass,
        enteredConfirmPass,
        error,
        setError,
        mailChangeHandler,
        passChangeHandler,
        confirmPassChangeHandler,
        resetForm
    };
};

export default useSignupForm;
