# Mailbox System

Mailbox is a React-based web application that allows users to send, receive, and manage emails with features like rich text composing, unread mail tracking, and mail status management. The frontend is built using **React**, **JavaScript**, **HTML**, and **CSS**, while **Firebase** is used for authentication, backend services, and database management.

## Features

- User authentication using Firebase
- Send and Receive emails
- Rich text editor for composing emails using react-draft-wysiwyg
- Seperate sections for Sent and Inbox mails
- Seen/Unseen mail status tracking
- Hover-based delete functionality for mails
- Permanent mail deletion feature
- Dynamic UI updates using React
- Firebase database integration for storing and managing mails

## Branches in Git 

main: Full Mailbox Application (React frontend with Firebase authentication and database)

## Tech Stack

### Frontend

- React.js
- JavaScript
- HTML
- CSS

### Backend & Database

- Firebase Authentication
- Firebase Realtime Database / Firestore

### Libraries & Packages

- react-draft-wysiwyg

## Project Structure

src/
├─ components/
│ ├─ Pages/ # pages related to user activies (like inbox, sent etc)
│ ├─ Register/ # Pages related to authentication
│ ├─ Store/ # Pages for storing the values

## Installation & Setup

npm install
npm start

## Usage 

- Sign up or log in to your account.
- Compose and Send emails.
- View received emails in the Inbox section.
- Access sent emails through Sent tab.
- Check unread mail count and seen/unseen status.
- Open mails to them as read
- Delete unwanted mails using the hover-based delete option.
