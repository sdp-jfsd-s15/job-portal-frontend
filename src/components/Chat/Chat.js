import React, { useState, useEffect } from "react";
import client from "../../websocket-server";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [receiver, setReceiver] = useState("");

    useEffect(() => {
        console.log("Received Messages:",messages); // Add this to debug state changes
    }, [messages]);

    useEffect(() => {
        // Initialize WebSocket connection
        client.onConnect = () => {
            // Subscribe to the private chat topic
            client.subscribe("/topic/private", (msg) => {
                console.log("Received message: ", msg.body);
                const receivedMessage = JSON.parse(msg.body);
                setMessages((prev) => [...prev, receivedMessage]);
            });
        };

        client.activate();

        // Cleanup WebSocket on component unmount
        return () => client.deactivate();
    }, []);

    const sendMessage = () => {
        if (message.trim() && username.trim() && receiver.trim()) {
            const chatMessage = {
                senderUserName: username,
                receiverUserName: receiver,
                chatMessage: message,
                status: "MESSAGE",
            };

            client.publish({
                destination: "/app/chat.sendMessage",
                body: JSON.stringify(chatMessage),
            });

            setMessage("");
        } else {
            alert("Please fill in all fields before sending a message.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Chat Application</h2>

            <div>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Receiver username"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                />
            </div>

            <div style={{ margin: "20px 0", height: "300px", overflowY: "scroll", border: "1px solid #ddd", padding: "10px" }}>
                {messages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.senderUserName}: </strong>{msg.chatMessage}
                    </p>
                ))}
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage} style={{ marginLeft: "10px" }}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
