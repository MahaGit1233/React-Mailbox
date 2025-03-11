import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { mailboxActions } from "../Store/redux";
import { convertFromRaw, convertToRaw } from "draft-js";

const useMailbox = () => {
    const dispatch = useDispatch();

    const extractPlainText = (rawText) => {
        const fixedRawText = { ...rawText, entityMap: rawText.entityMap || {} };
        try {
            const contentState = convertFromRaw(fixedRawText);
            return contentState.getPlainText();
        } catch (error) {
            console.error("convertFromRaw error:", error);
            return "Conversion failed";
        }
    };

    useEffect(() => {
        const fetchMails = async () => {
            const storedEmail = localStorage.getItem('email');
            if (!storedEmail) return;

            const email = storedEmail.replace(/[.@]/g, '_');

            try {
                const [receiverResponse, senderResponse] = await Promise.all([
                    fetch(`https://mailbox-43158-default-rtdb.firebaseio.com/receiver/${email}.json`),
                    fetch(`https://mailbox-43158-default-rtdb.firebaseio.com/sent/${email}.json`),
                ]);

                const [receiverData, senderData] = await Promise.all([
                    receiverResponse.json(),
                    senderResponse.json(),
                ]);

                const receivedMails = receiverData ? Object.entries(receiverData).map(([id, mail]) => ({
                    id,
                    ...mail,
                    text: extractPlainText(mail.text),
                    type: 'received',
                })) : [];

                const sentMails = senderData ? Object.entries(senderData).map(([id, mail]) => ({
                    id,
                    ...mail,
                    text: extractPlainText(mail.text),
                    type: 'sent',
                })) : [];

                dispatch(mailboxActions.setMails([...receivedMails, ...sentMails]));
            } catch (error) {
                console.error("Error fetching mails:", error);
            }
        };

        fetchMails();
    }, [dispatch]);

    const sendMail = async (mailData) => {
        const senderEmail = localStorage.getItem('email').replace(/[.@]/g, '_');
        const receiverEmail = mailData.mailId.replace(/[.@]/g, '_');
        const rawContent = convertToRaw(mailData.text.getCurrentContent());

        const formattedMail = {
            senderName: mailData.name,
            sender: senderEmail.replace(/_/g, '.'),
            receiver: receiverEmail.replace(/_/g, '.'),
            mail: mailData.mailId,
            subject: mailData.subject,
            text: rawContent,
            date: new Date().toLocaleString(),
            type: 'sent',
        };

        try {
            const senderResponse = await fetch(`https://mailbox-43158-default-rtdb.firebaseio.com/sent/${senderEmail}.json`, {
                method: 'POST',
                body: JSON.stringify(formattedMail),
                headers: { 'Content-Type': 'application/json' },
            });

            const receivedMail = { ...formattedMail, type: 'received' };

            await fetch(`https://mailbox-43158-default-rtdb.firebaseio.com/receiver/${receiverEmail}.json`, {
                method: 'POST',
                body: JSON.stringify(receivedMail),
                headers: { 'Content-Type': 'application/json' },
            });

            const senderData = await senderResponse.json();
            dispatch(mailboxActions.addMails({ id: senderData.name, ...formattedMail }));

            alert("Mail sent successfully!");
        } catch (error) {
            console.error("Error sending mail:", error);
            alert("Failed to send mail. Please try again.");
        }
    };

    const deleteMail = async (id, type) => {
        const senderEmail = localStorage.getItem('email').replace(/[.@]/g, '_');
        const url = type === 'sent'
            ? `https://mailbox-43158-default-rtdb.firebaseio.com/sent/${senderEmail}/${id}.json`
            : `https://mailbox-43158-default-rtdb.firebaseio.com/receiver/${senderEmail}/${id}.json`;

        try {
            await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
            dispatch(mailboxActions.deleteMails(id));
        } catch (error) {
            console.error("Error deleting mail:", error);
        }
    };

    return { sendMail, deleteMail };
};

export default useMailbox;
