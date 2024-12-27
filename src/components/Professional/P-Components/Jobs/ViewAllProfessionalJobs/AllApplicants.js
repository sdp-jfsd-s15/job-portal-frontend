import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Chip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import JoditEditor from "jodit-react";
import { generateEmailTemplate } from '../../../../generateEmailTemplate';
import API from '../../../../../Hooks/Api';

const AllApplicants = ({ exportToPDF, exportToExcel, data, renderTable, company }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [emailList, setEmailList] = useState(
        (data?.applicants || []).map((applicant) => applicant.email)
    );
    const [emailForm, setEmailForm] = useState({
        subject: '',
        companyName: company || '',
        text: '',
    });

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleRemoveEmail = (email) => {
        setEmailList(emailList.filter((item) => item !== email));
    };

    const handleFormChange = (e) => {
        setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
    };

    const handleEditorChange = (content) => {
        setEmailForm({ ...emailForm, text: content });
    };

    useEffect(() => {
        if (data?.applicants) {
            setEmailList(data.applicants.map((applicant) => applicant.email));
        }
    }, [data?.applicants]);

    const handleSendEmail = async () => {
        const emailBody = generateEmailTemplate({
            companyName: company,
            text: emailForm.text,
        })

        const requestPayload = {
            subject: emailForm.subject,
            body: emailBody,
            recipients: emailList,
        };

        const response = await API.post('https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/mail/send-email', requestPayload);

        if (response.status === 200) {
            alert('Email sent successfully!');
        } else {
            alert('Failed to send email.');
        }
        // Send API call here
        handleCloseDialog();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px', backgroundColor: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => exportToPDF(data.applicants || [], 'Applicants')}
                >
                    Save as PDF
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => exportToExcel(data.applicants || [], 'Applicants')}
                >
                    Save as Excel
                </Button>
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                    Send Email
                </Button>
            </Box>
            {renderTable(data.applicants || [], 'Applicants')}

            <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth>
                <DialogTitle>
                    Send Email
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleCloseDialog}
                        aria-label="close"
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {emailList.map((email) => (
                            <Chip
                                key={email}
                                label={email}
                                onDelete={() => handleRemoveEmail(email)}
                                color="primary"
                            />
                        ))}
                    </Box>
                    <TextField
                        fullWidth
                        name="subject"
                        label="Subject"
                        variant="outlined"
                        value={emailForm.subject}
                        onChange={handleFormChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        name="companyName"
                        label="Company Name"
                        variant="outlined"
                        value={emailForm.companyName}
                        onChange={handleFormChange}
                        sx={{ mb: 2 }}
                    />
                    <JoditEditor
                        value={emailForm.text}
                        onChange={handleEditorChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSendEmail} variant="contained" color="primary">
                        Send Email
                    </Button>
                    <Button onClick={handleCloseDialog} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AllApplicants;
