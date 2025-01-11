import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { format, parseISO } from 'date-fns';

const ContactInfoPop = ({ open, onClose, contactDetails = {} }) => {
    const formatBirthday = (dateString) => {
        try {
            return format(parseISO(dateString), 'MMMM dd, yyyy'); // Example: December 30, 1984
        } catch {
            return 'N/A'; // Fallback if date parsing fails
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Contact Info
                <IconButton 
                    aria-label="close" 
                    onClick={onClose} 
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'grey.500',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1"><strong>Phone:</strong> {contactDetails.phone || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {contactDetails.email || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Address:</strong> {contactDetails.address || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Birthday:</strong> {contactDetails.birthday ? formatBirthday(contactDetails.birthday) : 'N/A'}</Typography>
            </DialogContent>
        </Dialog>
    );
};

export default ContactInfoPop;
