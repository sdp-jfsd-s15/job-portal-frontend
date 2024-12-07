import React, { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { TextField, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { JoditEditor } from 'jodit-react';

const EmailDialog = ({ open, onClose, emails, setEmails }) => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const editor = useRef(null);

    const handleRemoveEmail = (email) => {
        const updatedEmails = emails.filter((e) => e !== email);
        setEmails(updatedEmails);
    };

    const handleSendEmail = () => {
        // Handle email sending logic here, you can use subject, body, and emails
        console.log('Subject:', subject);
        console.log('Body:', body);
        console.log('Emails:', emails);

        // After sending, close the dialog
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Send Email</DialogTitle>
            <DialogContent>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label="Subject"
                        fullWidth
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label="To"
                        fullWidth
                        value={emails.join(', ')}
                        disabled
                    />
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                    <JoditEditor
                        ref={editor}
                        value={body}
                        onChange={(value) => setBody(value)}
                    />
                </Box>

                <Box>
                    <h4>Emails to be sent:</h4>
                    {emails.map((email, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <span>{email}</span>
                            <IconButton onClick={() => handleRemoveEmail(email)} sx={{ marginLeft: 1 }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSendEmail} color="primary">Send</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmailDialog;
