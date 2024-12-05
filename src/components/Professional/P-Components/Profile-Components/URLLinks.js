import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { Box, CardContent, Divider, Typography, Tooltip, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CloseIcon from '@mui/icons-material/Close';
import API from '../../../../Hooks/Api';
import { useNavigate } from 'react-router-dom';

const URLLinks = ({ userdetails }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const [textToCopy, setTextToCopy] = useState('');
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleTextToCopy = () => {
            const currentPath = window.location.pathname;
            let targetPath = '';
            if (currentPath.startsWith('/professional/profile')) {
                targetPath = `http://localhost:3000/professional/profile/${userdetails.userName}`;
            } else if (currentPath.startsWith('/user/profile')) {
                targetPath = `http://localhost:3000/user/profile/${userdetails.userName}`;
            }
            setTextToCopy(targetPath);
        };
        handleTextToCopy();
    }, [userdetails.userName]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (error) {
            console.error('Failed to copy text: ', error);
        }
    };

    const handleAppliedJobsClick = async () => {
        try {
            const url = '/v1/api/jobApplicants/getAppliedJobsByUserName';
            const response = await API.get(url);
            setAppliedJobs(response.data.jobs);
            setDialogOpen(true); // Open the dialog to show jobs
        } catch (err) {
            console.error(err);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const showJobClicked = (id) => {
        // Logic to navigate to the job detail page
        navigate(`/user/view-job-applied/${id}`); // Example navigation
    };

    return (
        <Card
            sx={{
                width: '100%',
                height: userdetails.appliedJobs && userdetails.appliedJobs.length > 0 ? '290px' : '210px',
                position: 'relative',
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography gutterBottom variant="h6" component="div">
                        <b>Profile Language</b>
                    </Typography>
                    <EditOutlinedIcon sx={{ cursor: 'pointer' }} />
                </Box>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', marginRight: 1 }}>
                    English || <b>Role:</b> {userdetails.role}
                </Typography>

                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography gutterBottom variant="h6" component="div">
                        <b>Public Profile and URL</b>
                    </Typography>
                    <Tooltip title={copySuccess ? 'Copied!' : 'Copy to clipboard'} arrow>
                        <ContentCopyIcon onClick={handleCopy} />
                    </Tooltip>
                </Box>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', marginRight: 1 }}>
                    {textToCopy}
                </Typography>
                {userdetails.appliedJobs && userdetails.appliedJobs.length > 0 && (
                    <>
                        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                            onClick={handleAppliedJobsClick}
                        >
                            <Typography gutterBottom variant="h6" component="div">
                                <b>Applied Jobs ({userdetails.appliedJobs.length})</b>
                            </Typography>
                        </Box>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', marginRight: 1 }}>
                            Jobs that you have applied for......
                        </Typography>
                    </>
                )}
            </CardContent>

            {/* Dialog to display applied jobs */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth>
                <DialogTitle>
                    Applied Jobs
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {appliedJobs.map((record, index) => (
                        <Card
                            key={record.id}
                            sx={{ mt: 1, mb: 2, boxShadow: 'none', cursor: 'pointer' }}
                            onClick={() => showJobClicked(record.id)}
                        >
                            <CardContent>
                                <Box display="flex" alignItems="center">
                                    {/* Left side icon */}
                                    <CorporateFareIcon sx={{ fontSize: 40, mr: 2, mb: 6, color: 'gray' }} />

                                    {/* Right side content */}
                                    <Box flex={1}>
                                        <Typography variant="h6" sx={{ color: 'darkblue' }}>
                                            <b>{record.title}</b>
                                        </Typography>
                                        <Typography variant="body2" color="black">
                                            {record.company}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {record.location}
                                        </Typography>
                                        {index < appliedJobs.length - 1 && <Divider sx={{ my: 2 }} />}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default URLLinks;
