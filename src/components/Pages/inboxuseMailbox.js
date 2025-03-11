import { useDispatch, useSelector } from "react-redux";
import { mailboxActions } from "../Store/redux";

const useMailbox = () => {
    const dispatch = useDispatch();
    const receivedMails = useSelector(state => state.mailbox.receivedMails);
    const sentMails = useSelector(state => state.mailbox.sentMails);
    const read = useSelector(state => state.mailbox.readMails || []);

    console.log('readMails', read);

    const readHandler = (id) => {
        dispatch(mailboxActions.readMails(id));
    };

    return { receivedMails, read, sentMails, readHandler };
};

export default useMailbox;
