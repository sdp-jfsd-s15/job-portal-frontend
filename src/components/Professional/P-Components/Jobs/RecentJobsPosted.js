import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import Box from '@mui/material/Box';
import { useAuth } from '../../../../Token/AuthContext';
import API from '../../../../Hooks/Api';
import { Container } from '@mui/material';
import EastIcon from '@mui/icons-material/East';

const RecentJobsPosted = ({ onDataSend }) => {
    const [documentCount, setDocumentCount] = useState(0);
    const [recentRecords, setRecentRecords] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const recentJobs = async () => {
            try {
                const url = `/v1/api/job/recentlyAddedJobsByUserName/${user.username}`;
                const response = await API.get(url);
                if (response.status === 200) {
                    setDocumentCount(response.data.totalDocuments);
                    setRecentRecords(response.data.recentRecords);
                }
            } catch (err) {
                console.log(err);
            }
        };
        recentJobs();
    }, [user.username]);

    useEffect(() => {
        const sendDataToParent = () => {
            onDataSend(documentCount);  // Call the function passed from parent with the data
        };
        sendDataToParent();
    }, [documentCount, onDataSend]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box
                    sx={{
                        backgroundColor: 'white',
                        p: 2,
                        borderRadius: 2,
                        maxHeight: '700px', // Set fixed height
                        overflowY: 'auto', // Enable scrolling
                    }}
                >
                    {/* Title Card */}
                    <Card sx={{ mb: 2, boxShadow: 'none' }}> {/* Removed boxShadow */}
                        <CardContent>
                            <Typography variant="h6" component="div" sx={{ ml: 2, mb: 1 }}>
                                <b>Recent Jobs Posted By You</b>
                            </Typography>
                            <Divider sx={{ mb: 0 }} />
                        </CardContent>
                    </Card>

                    {/* Job Records Cards */}
                    {recentRecords.map((record, index) => (
                        <Card key={record.id} sx={{ mt: 1, mb: 2, boxShadow: 'none' }}> {/* Removed boxShadow */}
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
                                            {record.location} ({record.type})
                                        </Typography>
                                        {index < recentRecords.length - 1 && <Divider sx={{ my: 2 }} />}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}

                    {/* View Details Button */}
                    <Divider sx={{ width: '100%' }} />
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Button
                            color="black"
                            sx={{ width: '100%', textTransform: 'none', maxWidth: 700 }}
                            onClick={() => navigate("/professional/view-all-my-posted-jobs")}
                        >
                            <span><b>Show All </b></span>
                            <EastIcon />
                        </Button>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default RecentJobsPosted;
