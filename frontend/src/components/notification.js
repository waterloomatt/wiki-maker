import React, {useEffect, useState} from "react";
import Alert from "react-bootstrap/Alert";

export const Notification = () => {
    const [messages, setMessages] = useState([]);

    function fetchMessages() {
        let messages = localStorage.getItem('messages');

        if (messages === null) {
            messages = '[]';
        }

        setMessages(JSON.parse(messages));

        localStorage.removeItem('messages');
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div>
            {messages.map((notification) => (
                <Alert variant={notification.variant}>
                    {notification.message}
                </Alert>
            ))}
        </div>
    );
}

export const addNotification = (variant, message) => {

    const notification = {
        'variant': variant,
        'message': message,
    };

    let messages = localStorage.getItem('messages');

    if (messages === null) {
        messages = '[]';
    }

    const repository = JSON.parse(messages);

    repository.push(notification);

    localStorage.setItem('messages', JSON.stringify(repository));
}