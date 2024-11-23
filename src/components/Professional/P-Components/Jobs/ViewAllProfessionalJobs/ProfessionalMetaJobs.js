import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useAuth } from '../../../../../Token/AuthContext';
import API from '../../../../../Hooks/Api';

const ProfessionalMetaJobs = ({ onJobClick }) => {
  const { user } = useAuth();
  const [page, setPage] = React.useState(1);
  const [showActiveJobs, setShowActiveJobs] = React.useState(true); // State to control active/inactive jobs
  const [jobs, setJobs] = React.useState([]); // Store job data from API

  React.useEffect(() => {
    const fetchProfessionalJobs = async () => {
      try {
        const url = `/v1/api/job/getAllProfessionalJobs/${user.username}`;
        const response = await API.get(url);
        console.log(response.data); // Log response for debugging
        setJobs(response.data.data); // Set the fetched jobs to state
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfessionalJobs();
  }, [user.username]);

  // Recalculate filtered jobs
  const filteredJobs = React.useMemo(() => {
    return jobs.filter((job) => {
      if (showActiveJobs) {
        return job.isPublish && job.vacancy > 0; // Only show active jobs with vacancies
      } else {
        return !job.isPublish || job.vacancy === 0; // Show inactive jobs or vacancies = 0
      }
    });
  }, [jobs, showActiveJobs]);

  // Handle page change
  const handleChange = (event, value) => {
    setPage(value);
  };

  // Handle job card click to pass selected job to parent
  const handleJobClick = (job) => {
    onJobClick(job); // Pass selected job to parent component
  };

  // Number of jobs per page (cards to display)
  const jobsPerPage = 3;

  // Slice the filtered jobs array to show only the jobs for the current page
  const jobsToDisplay = filteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);

  // Handle toggle switch and refresh filtered jobs
  const handleToggle = () => {
    setShowActiveJobs((prev) => !prev);
    setPage(1); // Reset pagination to the first page
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          position: 'fixed',
          mt: 9,
          top: 0,
          left: 0,
          height: '100vh',
          width: 400,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          ml: 17,
          p: 2,
        }}
      >
        <Typography variant="h6" component="div" sx={{ ml: 2, mb: 1 }}>
          <b>Posted Jobs By You</b>
        </Typography>

        {/* Switch to toggle between active and disabled jobs */}
        <FormControlLabel
          control={
            <Switch
              checked={showActiveJobs}
              onChange={handleToggle}
              name="loading"
              color="primary"
            />
          }
          label={showActiveJobs ? 'Show Active Jobs' : 'Show Disabled Jobs'}
        />

        {/* Job Cards Container with Scroll */}
        <Box
          sx={{
            width: '100%',
            maxHeight: 500,
            overflowY: 'auto',
          }}
        >
          {jobsToDisplay.map((job) => (
            <Card
              key={job.id}
              sx={{ mb: 1, width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => handleJobClick(job)}
            >
              {/* Icon on the left side */}
              <Box sx={{ padding: 1 }}>
                <CorporateFareIcon />
              </Box>

              {/* Job Content on the right side */}
              <Box sx={{ flexGrow: 1, padding: 1 }}>
                <CardContent sx={{ padding: 0 }}>
                  <Typography variant="h6" sx={{ color: 'darkblue' }}>
                    <b>{job.title}</b>
                  </Typography>
                  <Typography variant="body2" color="black">
                    {job.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.type}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Box>

        {/* Pagination */}
        <center>
          <Pagination
            count={Math.ceil(filteredJobs.length / jobsPerPage)}
            page={page}
            onChange={handleChange}
            sx={{ marginTop: 1, width: '100%' }}
          />
        </center>
      </Box>
    </React.Fragment>
  );
};

export default ProfessionalMetaJobs;
