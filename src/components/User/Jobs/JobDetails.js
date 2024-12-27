import React from 'react';
import { Box, Typography, CircularProgress, Card, CardContent, Button } from '@mui/material';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CircleIcon from '@mui/icons-material/Circle';
import WorkIcon from '@mui/icons-material/Work';
import API from '../../../Hooks/Api';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const JobDetails = ({ job, loading, fetchSavedJobs }) => {
    const timeAgo = (inputDate) => {
        const now = new Date();
        const past = new Date(inputDate);

        const diffInMilliseconds = now - past;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} minutes ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hours ago`;
        } else {
            return `${diffInDays} days ago`;
        }
    }

    const handleUnSaveJob = async () => {
        try {
            const url = `https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/job/unSaveJob/${job.id}`;
            const response = await API.put(url)
            console.log(response)
            await fetchSavedJobs();
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <Box
            sx={{
                marginRight: 15,
                marginTop: -4,
                marginLeft: -10,
                top: 0,
                left: 0,
                // width: 400, // Adjust the width of the sidebar
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
            {job ? (
                <Card sx={{ width: '100%', position: 'relative', boxShadow: 'none' }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <CorporateFareIcon sx={{ fontSize: 40, mr: 2, mb: 2 }} />
                                <Typography
                                    gutterBottom
                                    variant="body1"
                                    component="div"
                                    sx={{ marginLeft: -1, marginTop: -1 }}
                                >
                                    <b>{job.company}</b>
                                    <br />
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant='h6'><b>{job.title}</b></Typography>
                            <Button onClick={() => { handleUnSaveJob() }}>
                                <BookmarkIcon style={{ cursor: 'pointer', fontSize: 30 }} />
                            </Button>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {job.location}{' '}
                            <CircleIcon sx={{ fontSize: 5, marginLeft: 0.5, marginBottom: 0.3 }} />{' '}
                            <span style={{ color: 'blue' }}>{timeAgo(job.createdAt)}</span>
                            <CircleIcon sx={{ fontSize: 5, marginLeft: 0.5, marginBottom: 0.3 }} />{' '}
                            <span>{job.vacancy} vacancies</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                            <WorkIcon sx={{ verticalAlign: 'middle' }} />{' '}
                            <span>{job.type}</span>
                        </Typography>
                        <Typography variant='body1' sx={{ marginTop: 2 }}><b>Skills:</b></Typography>
                        <Box component="ul" sx={{ listStyle: 'none', display: 'flex', padding: 0, margin: 0 }}>
                            {job.skills.map((skill, index) => (
                                <Box
                                    component="li"
                                    key={index}
                                    sx={{
                                        marginRight: 2, // Space between skills
                                        '&:last-child': { marginRight: 0 }, // Remove margin for the last skill
                                    }}
                                >
                                    <CircleIcon sx={{ fontSize: 5, marginLeft: 0.5, marginBottom: 0.3 }} />{' '}{skill}
                                </Box>
                            ))}
                        </Box>
                        <Typography variant='body1' sx={{ marginTop: 2 }}><b>Description:</b></Typography>
                        <div dangerouslySetInnerHTML={{ __html: job.description }} />
                        <Typography variant='body1' sx={{ marginTop: 2 }}><b>Qualifications:</b></Typography>
                        <div dangerouslySetInnerHTML={{ __html: job.qualifications }} />
                    </CardContent>
                </Card>
            ) : (
                <div><CircularProgress /></div>
            )}
        </Box>
    );
};

export default JobDetails;
