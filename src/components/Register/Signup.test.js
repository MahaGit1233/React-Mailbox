import '@testing-library/jest-dom'
import { Provider } from "react-redux"
import Signup from "./Signup"
import store from "../Store/redux"
import { render, screen } from '@testing-library/react';

describe('Signup component', () => {
    test('should contain the label Email id', () => {
        render(<Provider store={store}><Signup /></Provider>);
        const mailElement = screen.getByText('Email Id:');
        expect(mailElement).toBeInTheDocument();
    });

    test('should contain the label Password', () => {
        render(<Provider store={store}><Signup /></Provider>);
        const passwordElement = screen.getByText('Password:');
        expect(passwordElement).toBeInTheDocument();
    });

    test('should contain the label Confirm Password', () => {
        render(<Provider store={store}><Signup /></Provider>);
        const passwordElement = screen.getByText('Confirm Password:');
        expect(passwordElement).toBeInTheDocument();
    });

    test('should contain a textbox', async () => {
        render(<Provider store={store}><Signup /></Provider>);
        const textboxElement = await screen.findAllByRole('textbox');
        expect(textboxElement).not.toBeNull();
    });

    test('should contain a button', async () => {
        render(<Provider store={store}><Signup /></Provider>);
        const buttonElement = await screen.findAllByRole('button');
        expect(buttonElement).not.toBeNull();
    });
});