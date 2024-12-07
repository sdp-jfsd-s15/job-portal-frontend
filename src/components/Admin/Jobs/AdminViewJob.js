import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../../Hooks/Api';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CircleIcon from '@mui/icons-material/Circle';
import WorkIcon from '@mui/icons-material/Work';

const AdminViewJob = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    skills: [],
  });
  const { id } = useParams();

  const handleViewApplicants = (id) => {
    navigate(`/admin/view-applicants/${id}/${job.company}`)
  }


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


  const fetchJob = async () => {
    try {
      const response = await API.get(`/v1/api/job/getJob/${id}`);
      const jobData = response.data.jobData || {};
      setJob({
        id: jobData.id || "",
        company: jobData.company || "Not Provided",
        title: jobData.title || "No Title Available",
        description: jobData.description || "<p>No Description Available</p>",
        qualifications: jobData.qualifications || "<p>No Qualifications Listed</p>",
        vacancy: jobData.vacancy || 0,
        location: jobData.location || "Location Not Specified",
        type: jobData.type || "Not Specified",
        category: jobData.category || "Uncategorized",
        experience: jobData.experience || "Experience Not Mentioned",
        salary: jobData.salary || "Salary Not Disclosed",
        createdBy: jobData.createdBy || "Unknown",
        createdAt: jobData.createdAt || "",
        updatedAt: jobData.updatedAt || "",
        isPublish: jobData.isPublish || false,
        skills: jobData.skills || [],
        filters: jobData.filters || [],
      });
    } catch (error) {
      console.error('Error fetching job:', error);
      navigate('/error');
    }
  };


  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line
  }, [id]);

  return (
    <Container
      maxWidth="md"
      style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Grid container spacing={2} style={{ paddingBottom: 6 }}>
        <Grid item xs={4}>
          <ArrowBackIcon
            onClick={() => navigate('/admin/jobs/')}
            style={{ cursor: 'pointer' }}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          backgroundColor: 'white',
          p: 2,
          borderRadius: 2,
          overflowY: 'auto', // Enable scrolling
        }}
      >
        <Card sx={{ mb: 2, boxShadow: 'none' }}>
          <CardContent>
            <Box display="flex" alignItems="center">
              <CorporateFareIcon sx={{ fontSize: 40, mr: 1 }} />
              <Typography variant="body2" color="black">
                <b>{job.company}</b>
              </Typography>
            </Box>


            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ color: 'darkblue' }}>
                <b>{job.title}</b>
              </Typography>

            </Box>

            <Typography variant="body2" color="text.secondary">
              {job.location}{' '}
              <CircleIcon sx={{ fontSize: 5, marginLeft: 0.5, marginBottom: 0.3 }} />{' '}
              <span style={{ color: 'blue' }}>{timeAgo(job.createdAt)}</span>
              <CircleIcon sx={{ fontSize: 5, marginLeft: 0.5, marginBottom: 0.3 }} />{' '}
              <span>{job.vacancy > 0 ? `${job.vacancy} vacancies` : "No Vacancies"}</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              <WorkIcon sx={{ verticalAlign: 'middle' }} />{' '}
              <span>{job.type}</span>
            </Typography>
            <Typography variant='body1' sx={{ marginTop: 2 }}><b>Skills:</b></Typography>
            <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 0, m: 0 }}>
              {job.skills.length > 0 ? (
                job.skills.map((skill, index) => (
                  <Box
                    component="li"
                    key={index}
                    sx={{
                      backgroundColor: '#f0f0f0',
                      p: '5px 10px',
                      borderRadius: '12px',
                      mr: 1,
                      mb: 1,
                      fontSize: '14px',
                    }}
                  >
                    {skill}
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No Skills Listed</Typography>
              )}
            </Box>
            <Typography variant='body1' sx={{ marginTop: 2 }}><b>Description:</b></Typography>
            <div dangerouslySetInnerHTML={{ __html: job.description }} />
            <Typography variant='body1' sx={{ marginTop: 2 }}><b>Qualifications:</b></Typography>
            <div dangerouslySetInnerHTML={{ __html: job.qualifications }} />

            <Box sx={{ marginTop: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => {handleViewApplicants(job.id)}} // Your handler function for viewing applicants
                >
                  View Applicants
                </Button>
              </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default AdminViewJob