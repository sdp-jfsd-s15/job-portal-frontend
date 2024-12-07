import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SavedJobsList = ({ savedJobs, selectedJob, selectJob }) => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                position: 'fixed',
                mt: 9,
                top: 0,
                left: 0,
                height: '100vh',
                width: 300,
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                ml: 3,
                p: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',       // Make items appear in a row
                    alignItems: 'center',  // Vertically align items
                    mb: 2,                // Add margin at the bottom
                }}
            >
                <ArrowBackIcon 
                    sx={{ fontSize: 25, mr: 1, ml: -9, cursor: 'pointer' }} 
                    onClick={() => navigate('/user/work/')}
                /> {/* Add spacing to the right */}
                <Typography variant="h6">
                    Saved Jobs ({savedJobs.length})
                </Typography>
            </Box>
            <List>
                {savedJobs.map((job) => (
                    <React.Fragment key={job.id}>
                        <ListItem
                            button
                            selected={selectedJob === job.id}
                            onClick={() => selectJob(job.id)}
                        >
                            <ListItemText primary={job.title} secondary={`${job.company}, ${job.location}`} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default SavedJobsList;
