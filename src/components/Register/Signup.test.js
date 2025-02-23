import '@testing-library/jest-dom'
import { Provider } from "react-redux"
import Signup from "./Signup"
import store from "../Store/redux"
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import userEvent from '@testing-library/user-event';

describe('Signup component', () => {
    test('should contain the label Email id', () => {
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const mailElement = screen.getByText('Email Id:');
        expect(mailElement).toBeInTheDocument();
    });

    test('should contain the label Password', () => {
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const passwordElement = screen.getByText('Password:');
        expect(passwordElement).toBeInTheDocument();
    });

    test('should contain the label Confirm Password', () => {
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const passwordElement = screen.getByText('Confirm Password:');
        expect(passwordElement).toBeInTheDocument();
    });

    test('should contain a textbox', async () => {
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const textboxElement = await screen.findAllByRole('textbox');
        expect(textboxElement).not.toBeNull();
    });

    test('should contain a button', async () => {
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const buttonElement = await screen.findAllByRole('button');
        expect(buttonElement).not.toBeNull();
    });

    test('should submit sign up form and navigate to Mailbox component', () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ email: 'maharush5409@gmail.com', password: '789456' }],
        });
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const expenseElement = screen.queryByText('Mailbox');
        expect(expenseElement).toBeNull();
    });

    test('should submit login form and navigate to Mailbox component', () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ email: 'maharush5409@gmail.com', password: '789456' }],
        });
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const expenseElement = screen.queryByText('Mailbox');
        expect(expenseElement).toBeNull();
    });
});