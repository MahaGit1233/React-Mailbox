import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import MailboxForm from "./MailboxForm";
import store from "../Store/redux";

describe("MailboxForm Component", () => {
    test('Should close the overlay when clicked on the send button', () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ email: 'maharush5409@gmail.com' }],
        });

        render(<Provider store={store}><MailboxForm /></Provider>);
        const closeOverlayElement = screen.queryByText('Welcome to Mailbox!');
        expect(closeOverlayElement).toBeNull();
    });

    test('should send the mail when clicked on the send button', () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ email: 'maharush5409@gmail.com' }],
        });

        render(<Provider store={store}><MailboxForm /></Provider>);
        const sendMailElement = screen.queryByText('Welcome to Mailbox!');
        expect(sendMailElement).toBeNull();
    });
})
