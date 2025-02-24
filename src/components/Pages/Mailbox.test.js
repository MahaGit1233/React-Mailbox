import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min"
import Mailbox from "./Mailbox"
import store from "../Store/redux"
import userEvent from "@testing-library/user-event"

describe("Mailbox Component", () => {
    test('should open an overlay when clicked on "Compose ✎"', () => {
        render(<Provider store={store}><BrowserRouter><Mailbox /></BrowserRouter></Provider>);
        const overlayElement = screen.getByRole('button', { name: /Compose/i });
        userEvent.click(overlayElement);

        const outputElement = screen.queryByText('Welcome');
        expect(outputElement).not.toBeNull();
    });

    test('should contain a To textbox', () => {
        render(<Provider store={store}><BrowserRouter><Mailbox /></BrowserRouter></Provider>);
        const textboxElement = screen.getByText('X');
        expect(textboxElement).toBeInTheDocument();
    });

    test('should contain a Subject textbox', async () => {
        render(<Provider store={store}><BrowserRouter><Mailbox /></BrowserRouter></Provider>);
        const subjectElement = await screen.findByLabelText(/subject/i);
        expect(subjectElement).toBeInTheDocument();
    });
})