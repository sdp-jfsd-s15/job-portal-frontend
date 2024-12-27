import React, { useState, useEffect } from "react";
import client from "../../websocket-server";
// import { groupMessagesByDate } from "../utils/groupMessagesByDate";
// import API from "../../Hooks/Api";
import { Avatar, Box, Card, CardContent, FormControl, IconButton, TextField, Typography } from "@mui/material";


const Chat = ({ receiverUserName, senderUserName, activeUser }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    // useEffect(() => {
    //     if (!senderUserName || !receiverUserName) {
    //         console.log("No Username");
    //         return;
    //     }

    //     const fetchChatHistory = async () => {
    //         try {
    //             const response = await API.get(`/v1/api/chat/history/${senderUserName}/${receiverUserName}`);
    //             const chatData = response.data;
        
        
    //                 // Extract and sort chat history by sentDateAndTime
    //                 const sortedMessages = chatData.chatHistory.sort(
    //                     (a, b) => new Date(a.sentDateAndTime) - new Date(b.sentDateAndTime)
    //                 );
        
    //                 setMessages(sortedMessages);
        
    //         } catch (error) {
    //             console.error("Error fetching chat history:", error);
    //         }
    //     };

    //     fetchChatHistory();
    // }, [senderUserName, receiverUserName]);

    useEffect(() => {
        if (!senderUserName || !receiverUserName) return;

        client.onConnect = () => {
            client.subscribe("https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/topic/private", (msg) => {
                try {
                    const receivedMessage = JSON.parse(msg.body);
                    if (
                        (receivedMessage.senderUserName === senderUserName && receivedMessage.receiverUserName === receiverUserName) ||
                        (receivedMessage.senderUserName === receiverUserName && receivedMessage.receiverUserName === senderUserName)
                    ) {
                        setMessages((prev) => [
                            ...prev,
                            ...receivedMessage.chatHistory.filter(
                                (msg) => !prev.some((m) => m.messageId === msg.messageId)
                            ),
                        ]);
                    }
                } catch (error) {
                    console.error("Error processing incoming WebSocket message:", error);
                }
            });
        };

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [senderUserName, receiverUserName]);

    const sendMessage = () => {
        if (message.trim() && senderUserName.trim() && receiverUserName.trim()) {
            const chatMessage = {
                sendersUserName: senderUserName,
                receiversUserName: receiverUserName,
                chatMessage: message,
                sentDateAndTime: new Date().toISOString()
            };

            setMessages((prev) => [...prev, chatMessage]);

            try {
                client.publish({
                    destination: "https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/app/chat.sendMessage",
                    body: JSON.stringify(chatMessage),
                });
                setMessage("");
            } catch (error) {
                console.error("Failed to send message:", error);
                alert("Failed to send message. Please try again.");
            }
        } else {
            alert("Please fill in all fields before sending a message.");
        }
    };

    useEffect(() => {
        const chatContainer = document.querySelector("#chatContainer");
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

    // Group messages by date and format date if today or another date
    const groupMessagesByDate = (messages) => {
        return messages.reduce((groups, message) => {
            const messageDate = new Date(message.sentDateAndTime);
            const today = new Date();
            const isToday = messageDate.toDateString() === today.toDateString();
            const displayDate = isToday ? "Today" : messageDate.toLocaleDateString();

            if (!groups[displayDate]) {
                groups[displayDate] = [];
            }
            groups[displayDate].push({ ...message, displayDate, messageDate });
            return groups;
        }, {});
    };

    const groupedMessages = groupMessagesByDate(messages);

    // Format the time to display as '04:29 PM'
    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    return (
        <Box
            sx={{
                height: 'calc(100vh - 90px)', 
                display: 'flex',
                flexDirection: 'column',
                padding: 1,
                backgroundColor: '#fafafa',
            }}
        >
            {activeUser ? (
                <>
                    {/* User Info */}
                    <Card
                        sx={{
                            mb: 1,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <Box sx={{ padding: 1 }}>
                            <Avatar sx={{ width: 40, height: 40 }}>
                                {activeUser.firstName?.[0] ?? activeUser.userName[0]}
                                {activeUser.lastName?.[0] ?? ''}
                            </Avatar>
                        </Box>

                        <Box sx={{ flexGrow: 1, padding: 0 }}>
                            <CardContent sx={{ padding: 0 }}>
                                <Typography variant="h6" sx={{ color: 'darkblue', marginTop: 1, marginBottom: -1 }}>
                                    <b>{activeUser.firstName ? `${activeUser.firstName} ${activeUser.lastName}` : activeUser.userName}</b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    @{activeUser.userName}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>

                    {/* Chat Content */}
                    <Box
                        sx={{
                            maxHeight: 320,
                            flex: 1,
                            margin: '5px 0',
                            overflowY: 'scroll',
                            border: '1px solid black',
                            padding: '10px',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                        }}
                        id="chatContainer"
                    >
                        {Object.keys(groupedMessages).map((date, index) => (
                            <div key={index}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        marginTop: "20px",
                                        marginBottom: "20px",
                                        marginRight: '40px',
                                        marginLeft: '40px',
                                        fontWeight: 'bold',
                                        color: 'gray',
                                        textAlign: 'center',
                                        backgroundColor: '#f0f0f0',
                                        padding: '2px',
                                        borderRadius: '5px',
                                    }}
                                >
                                    {date}
                                </Typography>
                                {groupedMessages[date].map((msg, msgIndex) => (
                                    <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',  // Make both elements align in a row
                                        justifyContent: msg.sendersUserName === senderUserName ? 'flex-end' : 'flex-start',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            maxWidth: '70%',
                                            padding: '8px',
                                            backgroundColor: msg.sendersUserName === senderUserName ? '#d1f7d1' : '#fff',
                                            borderRadius: '10px',
                                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                            display: 'inline-block',
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ display: 'inline-block' }}>
                                            {msg.chatMessage}
                                        </Typography>
                                        <Box sx={{ display: 'inline-block', marginLeft: '10px' }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: '0.8rem',
                                                    color: 'gray',
                                                    textAlign: 'left',
                                                    display: 'inline-block', // Ensure it stays in line
                                                }}
                                            >
                                                {formatTime(msg.messageDate)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                ))}
                            </div>
                        ))}
                    </Box>

                    {/* Jodit Editor and Send Button */}
                    <Box
                        sx={{
                            mt: 1,
                            minHeight: '70px',
                            maxHeight: '150px',
                            overflowY: 'auto',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <FormControl fullWidth sx={{ flexGrow: 1 }}>
                            <TextField
                                fullWidth
                                id="message"
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                sx={{
                                    '& .MuiInputBase-root': { paddingTop: '6px', paddingBottom: '6px' },
                                    borderRadius: '8px',
                                }}
                                multiline
                            />
                        </FormControl>

                        <IconButton
                            onClick={sendMessage}
                            sx={{
                                color: '#1976d2',
                                marginLeft: 1,
                                marginTop: 1,
                                position: 'absolute',
                                right: 20,
                                top: 10,
                            }}
                        >
                            <Typography>Send</Typography>
                        </IconButton>
                    </Box>
                </>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </Box>
    );
};

export default Chat;
