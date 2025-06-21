import * as React from 'react';

interface EmailTemplateProps {
    fullName: string;
    email: string;
    message: string;
}

export const ContactEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    fullName,
    email,
    message,
}) => (
    <div>
        <h1>New Contact Form Submission</h1>
        <p>Name: {fullName}</p>
        <p>Email: {email}</p>
        <p>Message: {message}</p>
    </div>
);