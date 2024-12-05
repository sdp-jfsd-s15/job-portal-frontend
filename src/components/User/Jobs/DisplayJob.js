import React from 'react';
import { Card, CardContent, Typography, Grid, CardActionArea } from '@mui/material';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { useNavigate } from 'react-router-dom';

const DisplayJob = ({ jobs, page, pageSize, onPageChange }) => {
  const navigate = useNavigate();
  const handleClickedJob = (id) => {
    navigate(`/user/view-job/${id}`);
  }
  return (
    <div>
      <Grid container spacing={2}>
        {jobs.map((job, index) => (
          <Grid item xs={12} mr={2} mb={1} key={index}>
            <Card sx={{ display: 'flex', boxShadow: 3, width: '100%' }}>
            <CardActionArea onClick={() => {handleClickedJob(job.id)}}>
              <CardContent>
                {/* Left side: Icon */}
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <CorporateFareIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                  </Grid>
                  <Grid item xs>
                    {/* Job Title (Type) */}
                    <Typography variant="h6" component="div">
                      {job.title}
                    </Typography>
                    {/* Company Name */}
                    <Typography variant="body1" color="text.secondary">
                      {job.company}
                    </Typography>
                    {/* Location */}
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DisplayJob;
